#!/usr/bin/env bash
# Builds the ZIP to upload at platform.openai.com/plugins ("With MCP").
# OpenAI converts a Claude-format plugin: .claude-plugin/plugin.json plus skills/.
# The MCP server address is entered in the portal, so .mcp.json is left out.
set -euo pipefail

cd "$(dirname "$0")/.."
node scripts/validate.mjs

version=$(node -p "require('./plugin/.claude-plugin/plugin.json').version")
output="$PWD/dist/cademy-openai-${version}.zip"
mkdir -p dist
rm -f "$output"

(cd plugin && zip -rq -X "$output" .claude-plugin skills assets README.md LICENSE -x '*.DS_Store')
echo "Built $output"
unzip -l "$output"
