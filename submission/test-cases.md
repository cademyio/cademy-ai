# Test cases

For OpenAI's review form (exactly five positive and three negative) and Claude's reviewers. Run them on the `zoomtester` review account, signed in as its System Admin. The expected answers below assume a First Aid date and a Fire Marshal date this week, a learner called Tom on the First Aid date, and at least one unpaid booking next week. Once the sample data is in `zoomtester`, change the names and courses here to match it before pasting into the forms.

## Positive

### P1 - Courses this week

- **Prompt:** Which courses are on this week, and does every date have a trainer?
- **Expected tools:** `search_records` (course_dates), optionally `describe_records`.
- **Expected behaviour:** Lists the First Aid and Fire Marshal dates this week, names the trainer on First Aid and says the Fire Marshal date has no trainer. No changes.

### P2 - Run a course day

- **Prompt:** Run this week's First Aid course day: everyone attended except Tom, issue certificates without emailing anyone, then ask attendees for feedback.
- **Expected tools:** `search_records` (course_dates, registrations), `preview_change`, `mark_attendance`, `issue_certificates`, `request_feedback`.
- **Expected behaviour:** Shows one summary (attended, absent, certificates, no emails, feedback) and asks once. After "yes": everyone but Tom marked attended, certificates issued to attendees only with delivery set to none, feedback requested from attendees. If Tom is not on that date it says so and asks before going on.

### P3 - Chase unpaid bookings

- **Prompt:** Which bookings next week still owe money? Draft a reminder.
- **Expected tools:** `search_records` (orders), optionally `get_record`.
- **Expected behaviour:** Lists only the unpaid or part-paid bookings on next week's dates with outstanding amounts as Cademy displays them, gives the total, and drafts one reminder. Sends nothing and creates no pay link without being asked.

### P4 - Set up a course

- **Prompt:** Set up a new Fire Marshal refresher course with two dates next month at our main venue, £95, and publish it.
- **Expected tools:** `search_records` (courses, locations), `describe_records`, `create_record` (courses, course_dates), `update_record`, `preview_change`, `set_course_visibility`.
- **Expected behaviour:** Notices the existing Fire Marshal course and asks whether to copy it or start fresh, asks for any missing times, shows the plan and asks before creating and again before publishing. Ends with the course link.

### P5 - Bookings report

- **Prompt:** How did we do this month?
- **Expected tools:** `run_enrolment_report`, `search_records` (course_dates with counts, orders).
- **Expected behaviour:** One summary: dates, bookings, places filled, waitlists, money in and money owed, quoting Cademy's display amounts, with dates that need attention. No changes.

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
