# Temporal documentation style guidance

The content included in the Temporal information corpus follows the [Google developer documentation style guide](https://developers.google.com/style), with deference to the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/) for issues left unanswered by Google.
In addition, we maintain a set of Temporal-specific style guidelines that override certain aspects of the Google and Microsoft guides.

We recommend that you use the Vale extension for your IDE. Vale enables you to configure rule sets in its own configuration file, making it useful for defining Temporal's style guidelines.

If you have Visual Studio Code, we recommend using the Vale VSCode extension.

For more information on general style rules, see the rule sets defined in the `vale/styles` configuration files.

#### Capitalization of core terms

Many of Temporal's core terms can be used in a generic way.

To differentiate one of Temporal's core terms from a generic instance of a term, always treat the Temporal term as a proper noun.

Do not capitalize generic versions of Temporal terms. Use generic versions sparingly to avoid confusion.

- Correct: "Next, register the Activity within the Workflow."

- Incorrect: "Next, register the activity within the workflow."

#### Abbreviation of "identifier"

Do not abbreviate the word "identifier" as "ID", "Id", or "id" unless it's part of a Temporal core term. For core terms, the correct abbreviation is "Id", such as in "Workflow Id" or "Activity Id".

- Correct: "You can provide an order identifier or customer identifier as a Workflow Id."

- Incorrect: "You can provide an order ID or customer id as a Workflow Id."

In code (and when quoting or referring to code in text), follow the conventions of each language.

#### En dashes in ranges

Using an en dash (`&ndash;` or the character `–`) for a range of numbers is acceptable.
However, we recommend using _from_, _to_, and _through_ instead of an en dash when possible.

Be consistent.
If you use an en dash in one range, use en dashes in all ranges.
Do not mix words and en dashes (or hyphens, for that matter).

- Correct: "5 to 10 GB"
- Correct: "5–10 GB"
- Correct: "5-10 GB"
- Incorrect: "from 5-10 GB"

#### Infinitive verb forms in headings

Use questions and infinitive verb forms for titles and headings. People tend to word their search queries with infinitive verb forms; aligning our titles with what's commonly searched improves SEO.

- Correct: "How to install Temporal"
- Incorrect: "Installing Temporal"

#### Infinitive verb forms in labels

Treat labels like headings or titles and use infinitive verb forms when possible.

- Correct: "Install Temporal"
- Incorrect: "Installing Temporal"

#### Sentence casing in headings

Use sentence casing for titles and headings.
Sentence casing means that only proper nouns and the first letter of the first word are capitalized.

- Correct: "How to get started with Temporal"
- Incorrect: "How To Get Started With Temporal"
