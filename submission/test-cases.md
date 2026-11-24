# Test cases

Built into the OpenAI ZIP by `scripts/build-openai.mjs` (exactly five positive and three negative; the headings, Prompt, Expected tools and Expected behaviour lines are parsed, so keep their format) and Claude's reviewers. Run them on the `zoomtester` review account, signed in as `external-tester@cademy.io` (System Admin). The expected answers match the sample data in that account as of 24 November 2026: five courses with dates from 1 to 18 December, all in GBP. Dates are named, not "this week", so the answers stay right while the review runs. If the sample data changes, update this file.

## Positive

### P1 - Courses in early December

- **Prompt:** Which courses are running between 1 and 12 December, and does every date have a trainer?
- **Expected tools:** `search_records` (course_dates), optionally `describe_records`.
- **Expected behaviour:** Lists Spreadsheet Skills for Everyday Work (1 Dec), Facilitation Skills for Team Leads (3 Dec), Smartphone Photography Walk (5 and 12 Dec), Project Planning in 90 Minutes (8 Dec) and Watercolour Postcards for Beginners (9 Dec), and says none of these dates has a trainer yet. No changes.

### P2 - Run a course day

- **Prompt:** Run the Project Planning in 90 Minutes course day on 18 December: everyone attended except Noah, issue certificates without emailing anyone, then ask attendees for feedback.
- **Expected tools:** `search_records` (course_dates, registrations), `preview_change`, `mark_attendance`, `issue_certificates`, `request_feedback`.
- **Expected behaviour:** Finds four people on the date (Iona Kerr, Noah Muir, Freya Mercer, Dev Rowan) and shows one summary: Iona, Freya and Dev attended, Noah absent, certificates for those three with no emails, feedback requested from those three. Asks once. After "yes" it makes exactly those changes. Noah is never marked attended and gets no certificate.

### P3 - Chase unpaid bookings

- **Prompt:** Which December bookings still owe money? Draft a reminder.
- **Expected tools:** `search_records` (orders), optionally `get_record`.
- **Expected behaviour:** Lists exactly three unpaid bookings: Leo Fenwick £190.00 (Facilitation Skills for Team Leads, 3 Dec), Sana Weston £45.00 (Spreadsheet Skills for Everyday Work, 15 Dec) and Tessa Ainslie £95.00 (Facilitation Skills for Team Leads, 17 Dec), £330.00 in total, and drafts one reminder. Sends nothing and creates no pay link without being asked.

### P4 - Set up a course

- **Prompt:** Set up a new Excel Formulas Masterclass course with two dates in January at our Edinburgh venue, £60, and publish it.
- **Expected tools:** `search_records` (courses, locations), `describe_records`, `create_record` (courses, course_dates), `update_record`, `preview_change`, `set_course_visibility`.
- **Expected behaviour:** Asks for anything missing (the two dates and times), notes the similar Spreadsheet Skills course, shows the plan and asks before creating, then asks again before publishing. Ends with the course link. If publishing is refused by a plan limit, it says why.

### P5 - Bookings report

- **Prompt:** Give me a bookings report for December.
- **Expected tools:** `run_enrolment_report`, `search_records` (course_dates with counts, orders).
- **Expected behaviour:** One summary of the ten December dates with bookings and places, money in (£205.00 paid) and money owed (£330.00 unpaid), quoting Cademy's display amounts, and points out dates with no trainer. No changes.

## Negative (no Cademy tool should be called)

### N1 - Weather

- **Prompt:** What's the weather in Manchester tomorrow?
- **Expected behaviour:** Answers without Cademy (or says it cannot check the weather). No Cademy tool is called.

### N2 - Social post

- **Prompt:** Write a LinkedIn post about why first aid training matters.
- **Expected behaviour:** Writes the post from general knowledge. No Cademy tool is called, and no course data is pulled in unasked.

### N3 - General knowledge

- **Prompt:** What is CPR and when should you use it?
- **Expected behaviour:** Explains CPR from general knowledge. No Cademy tool is called.
