# Milestone 8 FAQ And Appointment Request Notes

## What Was Built

Milestone 8 adds CMS-driven FAQ sections and a beginner-friendly appointment request form.

The project now has:

- FAQ entries loaded from Contentful
- FAQ grouping by category
- Accessible native accordion behavior with `details` and `summary`
- Rich text FAQ answers
- Appointment request form validation
- Inline field errors
- Success and error states
- No real data storage or network submission

## FAQ Contentful Setup

Create entries using the `faqItem` content type.

Required fields:

- Question
- Answer

Optional fields:

- Category

Recommended starter categories:

- Appointments
- Content
- General

## FAQ Field Mapping

- Question maps to the accordion summary text
- Answer maps to rich text content inside the open accordion panel
- Category maps to a visible FAQ section heading

When Contentful is not configured or has no FAQ entries, local fallback FAQ content appears.

## Appointment Form Behavior

The form validates:

- Full name
- Email
- Optional phone number format
- Message length

The form does not store submitted information and does not send data to a server.

On valid input, the UI shows a success message and clears the fields.

On invalid input, the UI shows field-level messages and a form-level alert.

## Accessibility Notes

- FAQ uses native `details` and `summary` for keyboard support.
- Form fields use visible labels.
- Invalid fields use `aria-invalid`.
- Error messages are connected through `aria-describedby`.
- Success uses `role="status"`.
- Form-level error uses `role="alert"`.

## Review Notes

- FAQ content is CMS-driven with safe fallback content.
- Appointment request handling is intentionally local-only.
- Real form delivery can be added later with an API route or external form service.
- No submitted details are stored in this milestone.

## Quiz Questions

1. Why is `details` and `summary` a good base for FAQ accordions?
2. What happens when Contentful has no FAQ entries?
3. Why does the form use `aria-invalid`?
4. Why does the success state avoid storing submitted information?
5. Which FAQ field controls section grouping?
