---
name: import-from-a-spreadsheet
description: Use when a training admin wants to bring a spreadsheet or CSV into Cademy - contacts, organisations, courses, course dates, registrations or past bookings - for example "import these contacts and tell me about duplicates first", "load these 12 course dates" or "import last year's bookings without emailing anyone".
license: MIT
---

# Import from a spreadsheet

Get rows from a spreadsheet into Cademy safely: check first, import once.

1. **Work out what is being imported:** contacts, organisations, courses, course dates, registrations or orders (bookings with a total and payment status). Ask if it is not clear from the columns. Note any instruction such as "don't email anyone" or "onto next week's date".
2. **Start a draft import** with `prepare_import`. Call it for the fields first and tell the person which columns you will map to which Cademy fields, and which columns will be ignored. If the file is large or was not pasted, use the upload link Cademy returns.
3. **Check every row before importing.** Run `preview_change` for `import_records` with the column mapping. Report back before anything is written:
   - how many rows are new, will update an existing record, are unchanged or will fail,
   - every duplicate (same email or name as an existing record) and what will happen to it,
   - every failing row with its reason.
   Ask how to handle duplicates and failing rows, then ask once to import.
4. **Import** with `import_records` after a clear yes. Keep emails off: imports never email learners or bookers unless the person explicitly asked.
5. **Follow-ups the person asked for,** such as setting a trainer and venue on imported dates, are separate changes: preview them and ask before making them.
6. **Report back:** rows imported, updated, skipped and failed, and the link to the import in Cademy.

Never import without the row check in step 3, and never import rows the person chose to leave out.
