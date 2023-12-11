---
id: project-structure
title: Boilerplate Temporal Application project code
sidebar_label: Boilerplate project
description: Discover the minimum code you  need to create a boilerplate Temporal Application with TypeScript
tags:
  - typescript sdk
  - developer guide
  - project setup
---

**What is the minimum code I need to create a boilerplate Temporal Application?**

Let’s start with a single Workflow and register those functions with a Worker.

After you get the Worker running and have started a Workflow Execution, you will add a testing framework.

### Project structure

You can organize Temporal Application code to suit various needs in a way that aligns with the idiomatic style of the language you are working in.
This includes structuring your files according to your organization's best practices.

However, there are some general ways to think about organizing code.

The best practice is to group Workflows together, Activities together, and separate your Worker process into a standalone file.
Often this happens respectively per use case, business process, or domain.

For monorepo-style organizational techniques, consider a designated Workflow directory for each use case and place each Workflow in its own file, but also maintain a dedicated place for shared Activities.

For example, your project structure could look like this:

```text
monorepo/
├── backgroundcheck
│   ├── activities
│   ├── tests
│   │   ├── backgroundcheck.tests.ts
│   │   └── ssntracen.tests.ts
│   ├── worker.ts
│   └── workflows
│       └── backgroundcheck.ts
├── loanapplication
│   ├── activities
│   │   └── creditcheck.ts
│   ├── tests
│   │   ├── creditcheck.tests.ts
│   │   └── loanapplication.tests.ts
│   ├── worker.ts
│   └── workflows
│       └── loanapplication.ts
├── shared_activities
│   ├── payment.ts
│   └── send_email.ts
└── shared_tests
    └── tests.ts
```

Your project will look like this when you've finished this chapter:

```text
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── activities.ts
│   ├── client.ts
│   ├── mocha
│   │   ├── backgroundcheck.test.ts
│   │   └── ssntrace.test.ts
│   ├── worker.ts
│   └── workflows.,ts
└── tsconfig.json
```

### Initialize TypeScript project dependency framework

The TypeScript SDK offers a project creation tool you can use to scaffold your project. You'll use this tool to create a project folder and set up dependencies.

Run the following command in your shell:

```shell
npx @temporalio/create --sample empty backgroundcheck
```

You'll see the following output as the project generator downloads the project template and installs dependencies, including the TypeScript SDK:

```
Creating a new Temporal project in /Users/brianhogan/dev/documentation-samples-typescript/backgroundcheck/

Downloading files for sample empty. This might take a moment.

Installing packages. This might take a couple of minutes.
```

Once the dependencies install, the tool asks you if you'd like to initialize a Git repository for your project, which you should do. The tool then confirms your project is created:

```
Success! Created project backgroundcheck at:

~/backgroundcheck/
```

Switch to the `backgroundcheck` folder.

```
cd backgroundcheck
```

The project generator created the following directory structure for you:

```
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── activities.ts
│   ├── client.ts
│   ├── mocha
│   ├── worker.ts
│   └── workflows.ts
└── tsconfig.json
```

- The `package.json` file holds the project dependencies and a handful of scripts you'll use to run Workflows, Workflows, tests, and other tasks like linting and formatting your code.
- The `tsconfig.json` file holds the TypeScript configuration designed for working with Temporal's SDK.
- The `src/activities.ts` file is where you can define Activities.
- The `src/client.ts` file has the code for a small CLI program to execute a Workflow. You won't use this directly in this guide.
- The `src/mocha` folder is where you'll place your tests. We recommend using Mocha to test your Temporal Workflows and Activities.
- The `src/workflows.ts` file is where you can define Workflows.
- The `src/worker.ts` file has the code to configure and run your Worker process, which executes your Workflows and Activities.

In addition, you'll find configuration files for ESLint and Prettier.
