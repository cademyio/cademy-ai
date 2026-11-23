# Reviewer notes

Paste into OpenAI's secure "Review details" form. For Claude, send only when a reviewer asks by email (never put credentials in the Claude portal).

## About the account

- **Account:** Cademy Demo Academy, a Production Cademy account set up for reviews with sample courses, dates, bookings, invoices, certificates, feedback and an inbox. All contacts use made-up names and `@harness.cademy.test` email addresses, so no real person is emailed.
- **Sign in:** when the AI app asks you to connect, a Cademy page opens. Sign in with the email and password below (no two-factor code is asked for), then click Allow.
  - Email: `<reviewer login email>`
  - Password: `<reviewer password>`
- **Role:** System Admin, so every tool is available.
- **No card payments:** the account has no live payment processor connected. Card checkout and approving orders that charge a card will refuse with a clear message. Invoices, pay links and recorded payments work without moving real money.
- **Emails:** emails to the sample contacts go to unreachable `harness.cademy.test` addresses. Bulk email allowance follows the account's plan.

## How it behaves

- What you can see and change follows the signed-in person's role in Cademy, exactly as in the Cademy app.
- Writes that send emails, move money or change many records need `preview_change` first; the assistant shows the preview and asks before making the change.
- Every tool has a title and read-only, destructive, idempotent and open-world hints.
- Amounts are whole currency units with a display value (14400 GBP is £14,400.00).

## Resetting

If a reviewer changes the sample data, we reseed the account on request. Contact: `<support contact for reviewers>`.

## Data handling

The plugin itself holds only skills and the server address. The server reads and writes the signed-in person's Cademy account and returns that data to the AI app. Privacy policy: https://cademy.io/privacy.
