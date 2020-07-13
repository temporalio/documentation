# Temporal documentation

This repository contains Temporal's documentation.

The source of this documentation is available to the public for individual and commercial use.

You can view the published documentation at https://docs.temporal.io.

This documentation utilizes the [Docusaurus 2](https://v2.docusaurus.io/) framework, a modern static website generator, which makes it possible to build and view documentation locally.

## Contribution guidelines

Contributions from the community are highly encouraged.

To ensure that each change is relevant and properly peer reviewed, we request that you adhere to open source contribution best practices. GitHub's [first-contributions repo README](https://github.com/firstcontributions/first-contributions) offers a decent overview.

To contribute please follow these steps.

### Fork and clone

Start by forking the project into your GitHub account.

![Fork repository button](static/img/readme/forkrepo.png)

Then, using git, clone your fork locally.

```bash
$ git clone git@github.com:<your-account>/documentation-legacy.git
```

### Add upstream remote

Next, add the original repository as a new remote to your local clone.

```bash
$ cd documentation-legacy
$ git remote add upstream git@github.com/temporal/documentation-legacy.git
```

### Create a local branch

Before you make changes, you will want to sync your forked project and your local repository with the upstream project (temporal/documentation-legacy).

```bash
$ git checkout master
$ git pull upstream master && git push origin master
```

Create a branch to work on.

```bash
$ git checkout -b your-branch
```

Now you can start making changes! See [Building and viewing the site locally](#building-and-viewing-the-site-locally) for visualizing your changes.

### Submit a pull request

Once you are ready to submit your changes, create a pull request.

```bash
git push -u origin your-branch
```

This will create the branch on your GitHub project fork.

**Note** that the -u flag only needs to be used the first time you create a pull request for this branch.

Next, visit the project fork in your GitHub account and locate the new branch, and click "Compare and pull request".

Ensure the "base fork" points to the correct repository and branch and provide a clear title and explanation of the changes with links to any issues that are being fixed by the change.

Then click "Create pull request".

Refer to [Rob Allen's DevNotes](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) for details on the contribution process.

## Building and viewing the site locally

The website is built using [Docusaurus 2](https://v2.docusaurus.io/).

Check out their [installation requirements](https://v2.docusaurus.io/docs/installation#requirements) for tooling prerequisites.

### Initialize yarn

The first step is to initialize the use of Yarn to build the site locally.

From your terminal, change directory to the project root and run:

```bash
$ yarn install
```

Read the [yarn CLI docs](https://classic.yarnpkg.com/en/docs/cli/) if you want to learn what yarn is doing.

### View the site locally

You can view the site via localhost in your browser by running this command from inside the project:

```bash
$ yarn start
```

This command starts a local development server and opens up a browser window.

This will fail if there are source code errors or references to relative paths that do not exist.

Most changes to the site are reflected instantly without having to restart the server. Installing a new plugin will require you to restart.

## When will my changes be reflected in docs.temporal.io?

You will have a chance to preview the changes in your pull request. Click "Details" next to the Netlify deploy-preview check.

![Netlify build preview](static/img/readme/netlifypreview.png)

As soon as your pull request is merged, a new build will automatically kick off and deploy the changes to the [next](https://docs.temporal.io/docs/next/) version of the docs.

Temporal documentation will accumulate changes in the "next" version and be periodically released by our team to the "current" version of the docs.

Documentation version schemas will reflect the Temporal API version that they are pinned to as well as the iteration of the documentation for that API version.

Version schema: `{temporal api version}-docs-{docs version}`

Example: `0.26.0-docs-1`

There is no guarantee that documentation versions will be backwards or forwards compatible, meaning that pages that existed in a previous version are not guaranteed to exist in the next version and vice versa.
