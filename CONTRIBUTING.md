# How to contribute

Contributions from the community are highly encouraged.

To ensure that each change is relevant and properly peer reviewed, we request that you adhere to best practices for open-source contributions.
This means that if you are outside the Temporal organization, you must fork the repository and create pull requests from branches on your own fork.
GitHub's [first-contributions repo README](https://github.com/firstcontributions/first-contributions) provides an example of how to do that.

When it comes to crafting content, please follow our [style guidelines](style-guidance).

## Preview changes locally

The Temporal documentation site uses [Docusaurus 2](https://v2.docusaurus.io/), which is a static website generator.

You can make changes locally without previewing them in the browser.
However, if you wish to build the site and preview changes in the browser, you need to have [Docusaurus V2 dependencies](https://v2.docusaurus.io/docs/installation/#requirements) installed.

After you have the required tools installed and initialized in the repo (run [`yarn`](https://classic.yarnpkg.com/en/docs/cli/) once in the root directory), you can build and view the site locally:

```bash
yarn start
```

The command starts a local development server and opens a browser window.

## Pull requests

Make sure you add `flossypurse` and `djmagee` as reviewers to your pull request.

You will have a chance to preview the changes of your pull request by clicking "Details" next to the Netlify deploy-preview check.

![Netlify build preview](static/img/readme/netlifypreview.png)

Pull requests are typically reviewed within 1–2 business days.
Once approved, we will merge your changes.

As soon as your pull request is merged, a new build automatically occurs and your changes publish to [https://docs.temporal.io](https://docs.temporal.io).

### Prettier

Before submitting your pull request, make sure to reformat the code by using Prettier.

To install:

```
yarn install
```

To reformat:

```
yarn prettier --write '**/*.{js,md}'
```

## Style guidance

In general, this content adheres to the [Google developers style guide](https://developers.google.com/style).

However, we have some Temporal-specific style guidelines.

### Infinitive verb forms in headings

Titles and headings should use infinitive verb forms whenever possible. People tend to search by using infinitive verb forms, so using them helps SEO.

- Correct: "Install Temporal"
- Incorrect: "Installing Temporal"

### Sentence casing in headings

Use sentence casing for titles and headings.
Sentence casing means that only the first letter of the first word and proper nouns are capitalized.

- Correct: "How to get started with Temporal"
- Incorrect: "How To Get Started With Temporal"

### Capitalize core terms

Many of Temporal's core terms can be used in a generic way.
To differentiate between one of Temporal's core terms vs a generic instance of a term, always treat Temporal terms as proper nouns in documentation.
Generic versions of the same term should not be capitalized and should be used sparingly to avoid confusion.

- Correct: "... register the Activity within the Workflow... "
- Incorrect: "... register the activity within the workflow..."
