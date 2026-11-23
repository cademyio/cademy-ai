# Reviewer notes

Paste into OpenAI's secure "Review details" form. For Claude, send only when a reviewer asks by email (never put credentials in the Claude portal).

## About the account

- **Account:** `zoomtester`, a Production Cademy account we keep for app reviews, with sample courses, dates, bookings, contacts and certificates. Its contacts are test people, not real customers.
- **Sign in:** when the AI app asks you to connect, a Cademy page opens. Sign in with the email and password below (no two-factor code is asked for), then click Allow.
  - Email: `external-tester@cademy.io`
  - Password: `<reviewer password>`
- **Role:** System Admin, so every tool is available.
- **No card payments:** the account has no live payment processor connected. Card checkout and approving orders that charge a card will refuse with a clear message. Invoices, pay links and recorded payments work without moving real money.
- **Emails:** the sample contacts are test addresses. Please don't email addresses outside the account.

## How it behaves

- What you can see and change follows the signed-in person's role in Cademy, exactly as in the Cademy app.
- Writes that send emails, move money or change many records need `preview_change` first; the assistant shows the preview and asks before making the change.
- Every tool has a title and read-only, destructive, idempotent and open-world hints.
- Amounts are whole currency units with a display value (14400 GBP is £14,400.00).

## Resetting

Changing the sample data is fine; we tidy the account after the review. Contact: `<support contact for reviewers>`.

## Data handling

The plugin itself holds only skills and the server address. The server reads and writes the signed-in person's Cademy account and returns that data to the AI app. Privacy policy: https://cademy.io/privacy.
