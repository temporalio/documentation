# Style guidance

In general, Temporal content follows the [Google developer documentation style guide](https://developers.google.com/style).
When the Google guide is silent about an issue, we follow the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

## Temporal-specific style guidance

We have a few Temporal-specific style guidelines that override the Google and Microsoft guides.

### Capitalization of core terms

Many of Temporal's core terms can be used in a generic way.
To differentiate one of Temporal's core terms from a generic instance of a term, always treat the Temporal term as a proper noun in documentation.
Generic versions of the same term should not be capitalized and should be used sparingly to avoid confusion.

- Correct: "Next, register the Activity within the Workflow."
- Incorrect: "Next, register the activity within the workflow."

### Abbreviation of "identifier"

In text, do not abbreviate the word "identifier" as "ID", "Id", or "id" unless it is part of a Temporal core term, such as "Workflow Id" or "Activity Id".

- Correct: "You can provide an order identifier or customer identifier as a Workflow Id."
- Incorrect: "You can provide an order ID or customer id as a Workflow Id."

In code (and when quoting or referring to code in text), follow the conventions of each language.

### En dashes in ranges

Using an en dash (`&ndash;` or the character `–`) in a range of numbers is acceptable.
Even better is to use words such as _from_, _to_, and _through_.

Be consistent.
If you use an en dash in one range, use en dashes in all ranges.
Do not mix words and en dashes (or hyphens, for that matter).

- Correct: "5 to 10 GB"
- Correct: "5–10 GB"
- Correct: "5-10 GB"
- Incorrect: "from 5-10 GB"

## Headings

Although the following guidance is provided by both the Google and Microsoft guides, we want to emphasize how we style headings.

### Infinitive verb forms in headings

Titles and headings should use infinitive verb forms whenever possible. People tend to search by using infinitive verb forms, so using them helps SEO.

- Correct: "Install Temporal"
- Incorrect: "Installing Temporal"

### Sentence casing in headings

Use sentence casing for titles and headings.
Sentence casing means that only the first letter of the first word and proper nouns are capitalized.

- Correct: "How to get started with Temporal"
- Incorrect: "How To Get Started With Temporal"
