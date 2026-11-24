---
name: chase-unpaid-bookings
description: Use when a training admin wants to know who still owes money in Cademy and chase them - unpaid or part-paid bookings, outstanding invoices, organisation credit - for example "which bookings next week still owe money?", "chase unpaid invoices" or "draft payment reminders".
license: MIT
---

# Chase unpaid bookings

Find who owes money for a period, then help chase them without sending anything the person has not approved.

1. **Pin down the period.** Work out the dates the person means ("next week", "this month", "the March first aid date"). If they gave none, use courses starting in the next 14 days and say so.
2. **Find what is owed.** Use `search_records` on `orders` (call `describe_records` first for the field names) for orders on course dates in that period that are not fully paid. Leave out cancelled orders and orders waiting for approval unless asked. Use `get_record` on an order when you need its outstanding amount, invoices or deposit plan. For an organisation, `get_record` on it shows its credit.
3. **List it clearly.** One line per booking: booker (and organisation), course and date, amount outstanding and how it is due (invoice, deposit balance, instalment). Quote the display amounts Cademy returns, in the account's currency; never convert or recompute them. Give the total owed at the end.
4. **Draft one reminder.** Write a short, polite reminder the person can reuse, with the merge details shown as placeholders, and ask how they want to send it. Do not send, and do not create pay links, until they say so.
5. **Send only on a clear yes,** with the route they chose:
   - one person: `start_conversation`, so the reply lands in the Cademy Inbox,
   - several bookers: `send_bulk_email` to those orders' bookers,
   - an invoice to pay by card: `create_pay_link` on the issued invoice, then pass the link on (Cademy does not email it).
   Each of these needs a confirmed `preview_change` first; show who gets what and ask once for the whole batch.
6. **Report back:** who was emailed, who was skipped and why, and any pay links created.

Never record a payment, refund or cancel an order as part of chasing. If the person asks for that, treat it as a separate job and preview it.
