# cademy-ai

The Cademy plugin for Claude and ChatGPT lives in [`plugin/`](plugin/): its manifest, the address of Cademy's AI app server, five skills and the logo. That folder is what the Claude plugin directory scans and what the OpenAI ZIP is built from.

The rest of the repository is tooling and is not part of the plugin:

- `scripts/`: checks for the plugin and listing copy, and the OpenAI ZIP builder.
- `submission/`: listing copy, test cases, demo script, reviewer notes and the submission checklist.
