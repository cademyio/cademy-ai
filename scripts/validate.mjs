import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../plugin/', import.meta.url).pathname
const errors = []
const fail = (message) => errors.push(message)

const readJson = (path) => {
    try {
        return JSON.parse(readFileSync(join(root, path), 'utf8'))
    } catch (error) {
        fail(`${path}: ${error.message}`)
        return {}
    }
}

const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

const manifest = readJson('.claude-plugin/plugin.json')
if (manifest.name !== 'cademy') fail('plugin.json: name must stay "cademy" (permanent once listed)')
if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? '')) fail('plugin.json: version must be x.y.z')
if (!manifest.description) fail('plugin.json: description is required')
if (!manifest.author?.name) fail('plugin.json: author.name is required')
if (manifest.license !== 'MIT') fail('plugin.json: license must be MIT')
if (manifest.icon && !existsSync(join(root, manifest.icon))) fail(`plugin.json: icon ${manifest.icon} is missing`)
for (const key of ['homepage', 'documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl']) {
    if (manifest[key] && !manifest[key].startsWith('https://')) fail(`plugin.json: ${key} must be https`)
}

const mcp = readJson('.mcp.json')
const servers = Object.entries(mcp.mcpServers ?? {})
if (servers.length !== 1) fail('.mcp.json: exactly one server expected')
for (const [name, server] of servers) {
    if (server.type !== 'http') fail(`.mcp.json: ${name} must be type http`)
    if (server.url !== 'https://mcp.cademy.io/mcp') fail(`.mcp.json: ${name} must point at https://mcp.cademy.io/mcp`)
    if (server.headers && Object.keys(server.headers).length) fail(`.mcp.json: ${name} must not send headers`)
}

const frontmatter = (text) => {
    const match = text.match(/^---\n([\s\S]*?)\n---\n/)
    if (!match) return null
    return Object.fromEntries(
        match[1].split('\n').flatMap((line) => {
            const pair = line.match(/^([a-z-]+):\s*(.*)$/)
            return pair ? [[pair[1], pair[2].trim()]] : []
        })
    )
}

const skillsDirectory = join(root, 'skills')
const skills = readdirSync(skillsDirectory).filter((entry) => statSync(join(skillsDirectory, entry)).isDirectory())
if (skills.length === 0) fail('skills: at least one skill is required')
for (const folder of skills) {
    const path = `skills/${folder}/SKILL.md`
    if (!existsSync(join(root, path))) {
        fail(`${path}: missing`)
        continue
    }
    const text = readFileSync(join(root, path), 'utf8')
    const fields = frontmatter(text)
    if (!fields) {
        fail(`${path}: no frontmatter`)
        continue
    }
    if (fields.name !== folder) fail(`${path}: name must match the folder "${folder}"`)
    if (!NAME_PATTERN.test(fields.name ?? '') || fields.name.length > 64) fail(`${path}: name must be lowercase-hyphen, up to 64 characters`)
    if (!fields.description) fail(`${path}: description is required`)
    else if (fields.description.length > 1024) fail(`${path}: description is ${fields.description.length} characters, the limit is 1,024`)
    if (text.split('\n').length > 500) fail(`${path}: keep the body under 500 lines`)
}

const readme = readFileSync(join(root, 'README.md'), 'utf8').replace(/```[\s\S]*?```/g, '')
if (readme.split(/\s+/).filter(Boolean).length < 40) fail('README.md: needs at least 40 words outside code blocks')

if (errors.length) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'))
    process.exit(1)
}
console.info(`✓ plugin.json, .mcp.json, README and ${skills.length} skills are valid`)
