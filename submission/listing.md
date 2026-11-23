# Listing copy

Paste these as they are. Lengths are checked by `node scripts/check-listing.mjs`. No "MCP", "Plugin", pricing, trials, upgrade links or ads anywhere.

## Claude directory

The plugin listing is read from `.claude-plugin/plugin.json` and `README.md` and cannot be edited in the portal. The connector listing below is typed into the portal.

### Connector name (up to 100 characters)

<!-- claude-name -->
Cademy
<!-- /claude-name -->

### One-liner (up to 200 characters)

<!-- claude-one-liner -->
Manage courses, dates, bookings, orders, invoices, contacts and certificates in your Cademy training business, with every change previewed and confirmed.
<!-- /claude-one-liner -->

### Description (up to 2,000 characters)

<!-- claude-description -->
Cademy is booking and training management software for course providers. Connect your Cademy account to ask about and manage your training business in plain language.

Find what you need: which courses are on this week and who is trainer, who is booked, who is on a waitlist, who still owes money, whose certificates expire next month, what learners said in feedback, and what is waiting in the inbox.

Get admin work done: mark attendance, issue certificates, request feedback, create and move bookings, accept booking requests, set up courses and dates, import spreadsheets of contacts, dates or past bookings, reply to learners and send bulk emails.

Built for safety. The AI sees and changes only what your role in Cademy allows, with the same plan limits and Activity Log as the Cademy app. Anything that sends email, moves money or changes many records shows a preview first and waits for your confirmation.

The paired plugin adds five skills for everyday jobs: running a course day, chasing unpaid bookings, setting up a course, a bookings report and importing from a spreadsheet.

You need a Cademy account. Each person connects with their own Cademy login and can disconnect at any time from Settings in Cademy.
<!-- /claude-description -->

### Categories (1 to 5)

Productivity, Education, Business operations (pick the closest names the portal offers).

### Links

- Documentation: https://cademy.io/features/mcp (swap for the new AI apps page once it is live)
- Privacy policy: https://cademy.io/privacy
- Support: https://help.cademy.io
- Icon: `assets/logo-512.png`

## OpenAI plugin directory (ChatGPT and Codex)

### Name (up to 30 characters)

<!-- openai-name -->
Cademy
<!-- /openai-name -->

### Subtitle (up to 30 characters)

<!-- openai-subtitle -->
Run your training business
<!-- /openai-subtitle -->

### Description (up to 4,000 characters)

<!-- openai-description -->
Cademy is booking and training management software for course providers: first aid and health and safety trainers, professional training companies, tutors and workshop hosts. Connect your Cademy account to ask about and manage your training business in plain language.

What you can ask
- Which courses are on this week, and does every date have a trainer?
- Who is on the waitlist for the March first aid course?
- Which bookings next week still owe money?
- Whose certificates expire next month?
- What did learners say in the feedback for this course?

What you can get done
- Run a course day: mark attendance, issue certificates and ask attendees for feedback.
- Chase unpaid bookings: list what is owed and draft a reminder, sending only when you say so.
- Set up a course with its price, dates, trainer and venue, and publish it when you are ready.
- Get a summary of dates, bookings, places, waitlists, money in and money owed for any period.
- Import contacts, course dates or past bookings from a spreadsheet, with duplicates and errors reported before anything is imported.
- Create and move bookings, accept booking requests, reply to learners and send bulk emails.

Safe by design
- You connect with your own Cademy login, and the assistant sees and changes only what your role in Cademy allows.
- Every change follows the same rules, plan limits and Activity Log as the Cademy app.
- Anything that sends email, moves money or changes many records shows a preview first and waits for your confirmation.
- You can disconnect at any time from Settings in Cademy.

You need a Cademy account to use this.
<!-- /openai-description -->

### Category

Productivity (or Business, whichever the dashboard offers).

### Starter prompts (up to 3, each up to 128 characters)

<!-- openai-prompts -->
Which courses are on this week, and does every date have a trainer?
Which bookings next week still owe money? Draft a reminder.
How did we do this month?
<!-- /openai-prompts -->

### Capabilities (up to 20 labels, each up to 120 characters)

<!-- openai-capabilities -->
Look up courses, dates, bookings, orders, invoices and contacts
Mark attendance and issue certificates
Request and read learner feedback
Find unpaid bookings and draft payment reminders
Set up and publish courses and dates
Import contacts, dates and bookings from spreadsheets
Reply to learners and send bulk emails
<!-- /openai-capabilities -->

### Other fields

- Developer name: Cademy
- Website: https://cademy.io
- Support: https://help.cademy.io
- Privacy policy: https://cademy.io/privacy
- Terms of service: https://cademy.io/terms
- Brand colour: `#3D56E0` (Cademy blue, passes 2:1 against white; for dark mode use `#5B73F5`)
- Logo: `assets/logo-512.png`. Composer icon: `assets/logo-192.png`.
- MCP server: `https://mcp.cademy.io/mcp`, OAuth, Client ID Metadata Document preferred (the server also advertises PKCE S256 and the `none` client auth method).

## Example prompts (for both portals and the demo)

1. Which courses are on this week, and does every date have a trainer?
2. Run this week's First Aid course day: everyone attended except Tom, issue certificates without emailing anyone, then ask attendees for feedback.
3. Which bookings next week still owe money? Draft a reminder.
4. Set up a new Fire Marshal refresher course with two dates next month at our main venue, £95, and publish it.
5. How did we do this month?
6. Import these contacts and tell me about duplicates first.
