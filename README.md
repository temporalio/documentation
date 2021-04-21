# Temporal documentation

This repository contains Temporal's documentation.

The source of this documentation is available to the public for individual and commercial use.

You can view the published documentation at https://docs.temporal.io.

This documentation utilizes the [Docusaurus 2](https://v2.docusaurus.io/) framework, a modern static website generator, which makes it possible to build and view documentation locally.

## Contribution guidelines

Contributions from the community are highly encouraged.

To ensure that each change is relevant and properly peer reviewed, we request that you adhere to open source contribution best practices. GitHub's [first-contributions repo README](https://github.com/firstcontributions/first-contributions) offers a decent overview.

To contribute please follow these steps.

### Clone and branch

Clone the repository and checkout a new branch to work from:

```bash
git clone git@github.com:temporalio/documentation.git
cd documentation
git checkout -b yourbranch
```

Now you can start making changes! See [Building and viewing the site locally](#building-and-viewing-the-site-locally) for visualizing your changes.

### Submit a pull request

Once you are ready to submit your changes, create a pull request.

```bash
git add . && git commit -m "change details"
git push origin your-branch
```

Click on the link to create a new pull request from your branch.

## Building and viewing the site locally

The website is built using [Docusaurus 2](https://v2.docusaurus.io/).

Check out their [installation requirements](https://v2.docusaurus.io/docs/installation/#requirements) for tooling prerequisites.

### Initialize yarn

The first step is to initialize the use of Yarn to build the site locally.

From your terminal, change directory to the project root and run:

```bash
yarn install
```

Read the [yarn CLI docs](https://classic.yarnpkg.com/en/docs/cli/) if you want to learn what yarn is doing.

### View the site locally

You can view the site via localhost in your browser by running this command from the root of the project:

```bash
yarn start
```

The command starts a local development server and opens up a browser window.

## When will my changes be reflected in docs.temporal.io?

You have a chance to preview the changes of your pull request by clicking "Details" next to the Netlify deploy-preview check.

![Netlify build preview](static/img/readme/netlifypreview.png)

Someone from the Temporal team must approve your pull request. Once approved you may merge the changes.

As soon as your pull request is merged, a new build will automatically kick off and your changes will publish.
