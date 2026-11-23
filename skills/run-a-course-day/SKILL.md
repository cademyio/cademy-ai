---
name: run-a-course-day
description: Use when a training admin or trainer wants to close off a course date in Cademy - mark who attended, issue certificates, check quizzes and ask learners for feedback - for example "run today's first aid course day", "everyone came except Tom, issue the certificates" or "wrap up this week's course".
license: MIT
---

# Run a course day

The job after a course date has run: attendance, quizzes, certificates and feedback, in that order. Use the Cademy tools for every step.

1. **Find the date.** Use `search_records` on `course_dates` (call `describe_records` first if you do not know the field names) to find the course and date the person means. If more than one date matches, list them and ask which one. Note the trainer on it.
2. **Get the people on it.** Use `search_records` on `registrations` for that date. Leave out cancelled registrations. Match every name the person gave you ("everyone except Tom") to exactly one registration; if a name matches none or several, ask before going on.
3. **Check quizzes, if the course has them.** Look for anyone who has not passed the final quiz and any attempt waiting to be marked. Tell the person; do not mark quizzes unless they ask (`mark_quiz_response`).
4. **Plan the changes and ask once.** Put together one summary before changing anything:
   - who is marked attended and who absent,
   - who gets a certificate (attendees only, never someone marked absent or who has not passed a required quiz),
   - whether any email goes out (certificates are emailed only if the person asked for it; say "no emails" when they said so),
   - who gets the feedback request.
   Use `preview_change` for each write so Cademy checks it, then show the person the combined result and ask one question: go ahead?
5. **Make the changes, in order,** after a clear yes:
   - `mark_attendance` for the whole date with `status` attended and each absentee in `except` with status absent,
   - `issue_certificates` for the attendees, with `delivery` none unless the person asked for emails; pass back any ZIP link Cademy returns,
   - `request_feedback` for the attendees.
6. **Report back** in a few lines: how many marked attended and absent (by name if under ten), certificates issued or already held, feedback requests sent and who was skipped and why, and any link Cademy returned.

Never mark someone attended, issue a certificate or send an email the person did not ask for. If a tool refuses because of the person's role or plan, say so plainly and stop that step.
