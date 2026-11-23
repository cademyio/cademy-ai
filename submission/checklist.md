# Submission checklist

In order. Tick each line as it is done; anything marked **Adrian** needs an account owner.

## Before either portal

- [ ] CAD-7087 (server, firewall, challenge route) is in Production and the WAF stack is deployed.
- [ ] CAD-7078 (Connected AI Apps in Settings) is in Production, so the README and demo match the app.
- [ ] Anthropic replied to the money-tools pre-check email (policy on card capture through `approve_order`).
- [ ] **Adrian:** reviewer account "Cademy Demo Academy" signed up on Production, plan set, exempt from two-factor, seeded with `mcp:seedWorkflowAccount` (dry run, then live) and signs in without codes. Fill in the placeholders in `reviewer-notes.md` in the portal forms only, never in this repo.
- [ ] Docs page live on cademy.io; if its URL is not `https://cademy.io/features/mcp`, update `plugin.json` (`homepage`, `documentationUrl`), `README.md` and `listing.md`, and bump the version.
- [ ] Privacy policy at https://cademy.io/privacy covers AI app access and the data returned to AI apps.
- [ ] Full workflow harness passes on the Production reviewer account, with and without `--plugin=<path to this repo>`, negatives included.
- [ ] `node scripts/validate.mjs` and `node scripts/check-listing.mjs` pass; CI is green on `main`.
- [ ] Repo `cademyio/cademy-ai` is public with this content on `main`, tagged `v<version>`.

## Official MCP Registry

- [ ] **Adrian:** DNS TXT record on `cademy.io` for the registry's domain check.
- [ ] Publish `io.cademy/cademy` pointing at `https://mcp.cademy.io/mcp`.

## Claude directory (claude.ai/directory/manage, Team Owner or Directory permission)

- [ ] **Adrian:** connect GitHub with push access to `cademyio/cademy-ai`.
- [ ] Submit new → **MCP connector**: URL `https://mcp.cademy.io/mcp`, name, one-liner, description and categories from `listing.md`, docs, privacy and support links, icon `assets/logo-512.png`, the seven compliance acknowledgements.
- [ ] Submit new → **Plugin bundle**: repo `cademyio/cademy-ai`, path `/`, branch `main`. Fix anything the validator flags, then Listing details (read from `plugin.json` and the README), Data handling, the four compliance acknowledgements, submit.
- [ ] Pair the plugin with the connector once both are approved.
- [ ] If a reviewer asks for test access by email, reply with `reviewer-notes.md` and the login.
- [ ] On go-live: set the Claude listing URL in AdminUI config (CAD-7089) and comment on CAD-7088.

## OpenAI plugin directory (platform.openai.com/plugins, owner or Apps Management Write)

- [ ] **Adrian:** organisation identity verification (business) is complete.
- [ ] Build the ZIP: `bash scripts/package-openai.sh` → `dist/cademy-openai-<version>.zip`.
- [ ] New plugin → **With MCP**: server `https://mcp.cademy.io/mcp`, OAuth (Client ID Metadata Document preferred, DCR fallback is fine), no headers. Upload the ZIP so the five skills come with it.
- [ ] **Domain verification for `mcp.cademy.io`:**
  1. The dashboard shows a verification token during submission. Copy it exactly; it comes from OpenAI and is not a random string.
  2. **Adrian:** in AWS Secrets Manager (Production), open the secret named by the Production Mcp Lambda's `SECRET_NAME` environment variable and add the key `OPENAI_APPS_CHALLENGE_TOKEN` with the token as its value.
  3. Wait for the Lambda to cold-start, or redeploy it, so it reads the new secret.
  4. Check: `curl https://mcp.cademy.io/.well-known/openai-apps-challenge` prints exactly the token (it returns 404 until the token is set).
  5. Click Verify in the dashboard.
- [ ] Listing: name, subtitle, description, category, starter prompts, capabilities, developer name, website, support, privacy and terms URLs, brand colour, logo and composer icon from `listing.md`.
- [ ] Review details: the five positive and three negative test cases from `test-cases.md`, demo video URL (record from `demo-script.md`), reviewer login from `reviewer-notes.md` in the secure form.
- [ ] Submit. Only one review can be open at a time; feedback comes by email.
- [ ] After approval, publish manually. Set the ChatGPT listing URL in AdminUI config (CAD-7089) and comment on CAD-7088.

## After listing

- Every change: edit, bump `version`, add a `CHANGELOG.md` line, merge to `main` (Claude rescans), rebuild the ZIP and upload a new version to OpenAI for review.
- Monthly: connections per AI app, Claude error rate (under 2%) and rank, OpenAI analytics, and the harness with the plugin after tool changes.
