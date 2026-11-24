import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const plugin = join(root, 'plugin')
const listing = readFileSync(join(root, 'submission/listing.md'), 'utf8')
const section = (key) => {
    const match = listing.match(new RegExp(`<!-- ${key} -->\\n([\\s\\S]*?)\\n<!-- /${key} -->`))
    if (!match) throw new Error(`submission/listing.md: missing ${key}`)
    return match[1].trim()
}
const lines = (key) => section(key).split('\n').filter(Boolean)

const claude = JSON.parse(readFileSync(join(plugin, '.claude-plugin/plugin.json'), 'utf8'))
const claudeMcp = JSON.parse(readFileSync(join(plugin, '.mcp.json'), 'utf8'))

const manifest = {
    name: claude.name,
    version: claude.version,
    description: claude.description,
    author: claude.author,
    homepage: claude.homepage,
    repository: claude.repository,
    license: claude.license,
    keywords: claude.keywords,
    skills: './skills/',
    mcpServers: './.mcp.json',
    interface: {
        displayName: section('openai-name'),
        shortDescription: section('openai-subtitle'),
        longDescription: section('openai-description'),
        developerName: 'Cademy',
        category: 'Productivity',
        capabilities: lines('openai-capabilities'),
        websiteURL: 'https://cademy.io',
        supportURL: claude.supportUrl,
        privacyPolicyURL: claude.privacyPolicyUrl,
        termsOfServiceURL: claude.termsOfServiceUrl,
        defaultPrompt: lines('openai-prompts'),
        brandColor: '#3D56E0',
        brandColorDark: '#5B73F5',
        composerIcon: './assets/logo-192.png',
        logo: './assets/logo-512.png',
    },
}

const mcp = {
    mcpServers: Object.fromEntries(
        Object.entries(claudeMcp.mcpServers).map(([name, server]) => [
            name,
            { url: server.url, extensions: { 'com.openai': { auth: { type: 'oauth', client: { mode: 'cimd' } } } } },
        ])
    ),
}

const staging = join(root, 'dist/openai')
const output = join(root, `dist/cademy-openai-${claude.version}.zip`)
rmSync(staging, { recursive: true, force: true })
rmSync(output, { force: true })
mkdirSync(join(staging, '.codex-plugin'), { recursive: true })
writeFileSync(join(staging, '.codex-plugin/plugin.json'), `${JSON.stringify(manifest, null, 4)}\n`)
writeFileSync(join(staging, '.mcp.json'), `${JSON.stringify(mcp, null, 4)}\n`)
for (const entry of ['skills', 'assets', 'README.md', 'LICENSE']) cpSync(join(plugin, entry), join(staging, entry), { recursive: true })

execFileSync('zip', ['-rq', '-X', output, '.', '-x', '*.DS_Store'], { cwd: staging, stdio: 'inherit' })
console.info(`Built ${output}`)
execFileSync('unzip', ['-l', output], { stdio: 'inherit' })
