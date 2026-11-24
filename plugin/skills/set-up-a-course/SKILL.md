---
name: set-up-a-course
description: Use when a training admin wants to create or copy a course in Cademy and get it ready to book - course details, price, dates, trainer, venue and publishing - for example "set up a new Fire Marshal refresher with two dates next month at our main venue, £95, and publish it" or "copy Manual Handling as a refresher course".
license: MIT
---

# Set up a course

Get a course from nothing (or from an existing course) to bookable dates on the website.

1. **Check what exists.** Use `search_records` on `courses` for a course with the same or a similar name. If one exists, ask whether to add dates to it, copy it (`clone_course`, which copies lessons and quizzes but no dates) or make a new one.
2. **Gather the details,** asking only for what is missing: course name, price (and currency if the account has several), dates and times, venue, trainer and places per date. Use `search_records` and `describe_records` to find the venue (`locations`) and trainer by name; never guess an id.
3. **Show the plan and ask once.** List the course, its price, every date with time, venue and trainer, and whether it will be published. Use `preview_change` for each write that needs one.
4. **Create, in order,** after a clear yes:
   - the course with `create_record` (or `clone_course`), then its price with `update_record` on the course's pricing fields from `describe_records`,
   - each date with `create_record` on `course_dates`, setting venue and trainer. For more than about ten dates, use `prepare_import` and `import_records` instead (see the import-from-a-spreadsheet skill).
5. **Publish only when asked.** Publishing puts the course on the website, so confirm it even if the first request said "and publish it" before anything was created. Use `set_course_visibility`. If Cademy refuses (published-course limit, no payment method for paid courses), tell the person why and what to change.
6. **Report back** with the course name, price, each date, and the course page link Cademy returned.

Do not change other courses, and do not email anyone while setting up a course.
