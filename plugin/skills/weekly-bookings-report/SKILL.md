---
name: weekly-bookings-report
description: Use when a training admin asks how the business is doing in Cademy for a period - courses running, bookings, places filled, waitlists, money in and money owed - for example "how did we do this month?", "give me this week's bookings report" or "what's on next week and are we full?".
license: MIT
---

# Weekly bookings report

One short summary of a period, built from Cademy's own numbers. Read only: this skill never changes anything.

1. **Pick the period.** Use the one the person names. "This week" is Monday to Sunday of the current week, "this month" the calendar month so far. Say which dates you used.
2. **Gather the numbers:**
   - `run_enrolment_report` for the period: revenue, orders, new participants and revenue by payment status (System Admin only; if refused, say so and carry on with the rest),
   - `search_records` on `course_dates` in the period with `include: ["counts"]`: each date with bookings, places left, waitlist and whether it has a trainer,
   - `search_records` on `orders` that are not fully paid, for the money owed,
   - waitlists that are building up, from the counts above.
3. **Write one summary,** in this order and kept to a screen:
   - headline: dates run or coming up, bookings, places filled,
   - money in and money still owed, quoting Cademy's display amounts,
   - dates that need attention: nearly full, low bookings, no trainer, long waitlist,
   - one line on anything unusual compared with what the person asked about.
4. **Offer next steps** in one line, without doing them: chase what is owed (chase-unpaid-bookings), add a date for a long waitlist (set-up-a-course), assign a trainer.

Never recompute money from rows when the report gives a total, and never present a number Cademy did not return.
