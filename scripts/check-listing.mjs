import { readFileSync } from 'node:fs'

const text = readFileSync(new URL('../submission/listing.md', import.meta.url), 'utf8')
const section = (key) => {
    const match = text.match(new RegExp(`<!-- ${key} -->\\n([\\s\\S]*?)\\n<!-- /${key} -->`))
    if (!match) throw new Error(`submission/listing.md: missing ${key}`)
    return match[1].trim()
}

const LIMITS = {
    'claude-name': 100,
    'claude-one-liner': 200,
    'claude-description': 2000,
    'openai-name': 30,
    'openai-subtitle': 30,
    'openai-description': 4000,
}
const BANNED = [/\bmcp\b/i, /\bplugin\b/i, /\bfree trial\b/i, /\bupgrade\b/i, /£|\$|€/]

const errors = []
for (const [key, limit] of Object.entries(LIMITS)) {
    const value = section(key)
    if (value.length > limit) errors.push(`${key}: ${value.length} characters, limit ${limit}`)
    const banned = BANNED.find((pattern) => pattern.test(value) && !(key === 'claude-description' && /plugin/i.test(pattern.source)))
    if (banned) errors.push(`${key}: contains ${banned}`)
    console.info(`${key}: ${value.length}/${limit}`)
}

const prompts = section('openai-prompts').split('\n').filter(Boolean)
if (prompts.length > 3) errors.push(`openai-prompts: ${prompts.length}, limit 3`)
prompts.filter((prompt) => prompt.length > 128).forEach((prompt) => errors.push(`openai-prompts: over 128 characters: ${prompt}`))

const capabilities = section('openai-capabilities').split('\n').filter(Boolean)
if (capabilities.length > 20) errors.push(`openai-capabilities: ${capabilities.length}, limit 20`)
capabilities.filter((label) => label.length > 120).forEach((label) => errors.push(`openai-capabilities: over 120 characters: ${label}`))

if (errors.length) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'))
    process.exit(1)
}
console.info('✓ listing copy is within every limit')
