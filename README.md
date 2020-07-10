# Temporal documentation repository

This repo contains Temporal's open source documentation.

You can view the published documentation at https://docs.temporal.io.

This repo utilizes the [Docusaurus 2](https://v2.docusaurus.io/) framework, a modern static website generator, which allows you to build and view the documentation locally as you contribute.

## Contribution guidelines

Contributions from the community are highly encouraged.

To contribute please follow these steps.

### Step 1: Fork and clone

To ensure that each change is properly peer reviewed, we request that you follow standard open source contribution processes.

This means that you should start by forking the project into your own GitHub account.

Then, clone your own fork of the repo onto your local machine.

```
$ git clone git@github.com:<your-account>/documentation-legacy.git
```

### Step 2: Add upstream remote

Then add the original repository as a new remote to your local clone.

```
$ cd documentation-legacy
$ git remote add upstream git@github.com/temporal/documentation-legacy.git
```

### Step 3: Create a local branch

When you are ready to start making changes, sync your local clone with the upstream project and your forked GitHub project.

```
$ git checkout master
$ git pull upstream master && git push origin master
```

Then, create a branch to work on.

```
$ git checkout -b your-branch
```

Now you can make your changes. See the next section about building and viewing the site locally for those steps.

### Step 4: Submit a pull request

Once you are ready to submit your changes, create a pull request.

```
git push -u origin your-branch
```

This will create the branch on your GitHub project fork.

**Note** that the -u flag only needs to be used the first time you create a pull request for this branch.

Next, visit the project fork in your GitHub account and locate the new branch, and click "Compare and pull request".

Ensure the "base fork" points to the correct repository and branch and provide a clear title and explanation of the changes with links to any issues that are being fixed by the change.

Then click "Create pull request".

## Building and viewing the site locally

This website is built using [Docusaurus 2](https://v2.docusaurus.io/).

Check out their [installation requirements](https://v2.docusaurus.io/docs/installation#requirements) for tooling prerequisites.

### Step 1: Initialize yarn

The first step is to initialize the use of Yarn to build the site locally.

From your terminal, change directory to the project root and run:

```
$ yarn
```

### Step 2: Build the website

The following command generates static content into the `build` directory which can be served using any static contents hosting service.

```
$ yarn build
```

It also ensures that the site is building correctly without errors or misconfigurations.

### Step 3: View the site in localhost

You can view the site via localhost in your browser by running this command from inside the project:

```
$ yarn start
```

This command starts a local development server and opens up a browser window.

Most changes to the site are reflected instantly without having to restart the server.

You can run `yarn start` independently of `yarn build`.

## When will my changes be reflected in docs.temporal.io?

As soon as your pull request is merged, a new build will automatically kick off and deploy the changes to the [next](https://docs.temporal.io/docs/next/) version of the docs.

Temporal will accumulate changes in the next version and periodically release them to the "current" version of the docs.

Documentation version schemas will reflect the Temporal API version that they are pinned to as well as the iteration of the documentation for that API version.

Version schema: <temporal api version>-docs-<docs version>
Example: 0.26.0-docs-1

There is no guarantee that documentation versions will be backwards or forwards compatible, meaning that pages that existed in a previous version are not guaranteed to exist in the next version and vice versa.
