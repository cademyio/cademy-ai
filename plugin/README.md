# Cademy for Claude and ChatGPT

Cademy is the AI-native training management system for training providers: course booking, training management (TMS), learning management (LMS) and training CRM in one platform, used by 1,000+ training teams. This plugin connects Claude or ChatGPT to your Cademy account so you can run your whole training business from one conversation: build the course, sell the seats, run the day, teach, certify and invoice. It adds five skills that show the AI how a training admin does everyday jobs.

## What you can ask

- "Which courses are on this week, and does every date have a trainer?"
- "Run this week's first aid course day: everyone attended except Tom, issue certificates without emailing anyone, then ask for feedback."
- "Which bookings next week still owe money? Draft a reminder."
- "Set up a Fire Marshal refresher with two dates next month at our main venue, £95."
- "How did we do this month?"
- "Import these contacts and tell me about duplicates first."

## Skills

| Skill | What it does |
| --- | --- |
| `run-a-course-day` | Marks attendance, checks quizzes, issues certificates and requests feedback for one course date. |
| `chase-unpaid-bookings` | Lists bookings that still owe money for a period and drafts reminders, sending nothing until you say so. |
| `set-up-a-course` | Creates or copies a course with its price, dates, trainer and venue, and publishes it when you confirm. |
| `weekly-bookings-report` | Summarises dates, bookings, places, waitlists, money in and money owed for a period. Read only. |
| `import-from-a-spreadsheet` | Checks a spreadsheet row by row, reports duplicates and errors, then imports it once you confirm. |

## Getting started

1. You need a Cademy account. Anyone on the team can connect; what the AI can see and change follows that person's role in Cademy.
2. Install the Cademy plugin from the Claude or ChatGPT directory.
3. Connect when asked. A Cademy page opens where you sign in and approve the connection. You can disconnect at any time from Settings › Connected AI Apps in Cademy.

Set-up guide: <https://help.cademy.io/en/articles/18547504-set-up-cademy-mcp-in-chatgpt-claude-codex-and-other-ai-apps>

## Safety

- Every change goes through the same permission checks, plan limits and Activity Log as the Cademy app.
- Changes that send emails, move money or touch many records show a preview first, and the AI asks you before making them.
- The skills never send emails, publish courses or import data without your confirmation.

## Data and privacy

This plugin contains only instructions (skills) and the address of Cademy's AI app server, `https://mcp.cademy.io/mcp`. It runs no code on your computer, holds no secrets and fetches nothing else. When you use it, the AI app sends your requests to that server, which reads and changes your Cademy account on your behalf, using the access you approved. Cademy's privacy policy: <https://cademy.io/privacy>. Terms: <https://cademy.io/terms>.

## Support

Help centre: <https://help.cademy.io>. Issues with the plugin itself can be raised on this repository.

## Licence

MIT, see [LICENSE](LICENSE).
