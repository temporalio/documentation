---
id: project-structure
title: Boilerplate Temporal Application project code
sidebar_label: Boilerplate project
description: Discover the minimum code I need to create a boilerplate Temporal Application.
tags:
  - go sdk
  - developer guide
  - project setup
---

**What is the minimum code I need to create a boilerplate Temporal Application?**

Let’s start out with a single Activity Workflow and register those functions with a Worker.

After we get the Worker running and have started a Workflow Execution, we will add a testing framework.

### Project structure

You can organize Temporal Application code to suit various needs in a way that aligns with the idiomatic style of the language you are working in.
This includes structuring your files according to your organization's best practices.

However, there are some general ways to think about organizing code.

The best practice is to group Workflows together, Activities together, and separate your Worker process into a standalone file.
Often this happens respectively per use case, business process, or domain.

For mono-repo style organizational techniques, consider a designated Workflow directory for each use case and place each Workflow in its own file, but also maintain a dedicated place for shared Activities.

For example your project structure could look like this:

```text
/monorepo
    /shared_activities
        | payment.go
        | send_email.go
    /shared_tests
        | tests.go
    /backgroundcheck
        /workflows
            | backgroundcheck.go
        /activities
            | ssntrace.go
        /worker
            | main.go
        /tests
            | tests.go
    /loanapplication
        /workflows
            | loanapplication.go
        /activities
            | creditcheck.go
        /worker
            | main.go
        /tests
            | tests.go
```

If you are following along with this guide, your project will look like this:

```text
/backgroundcheck
    /workflows
        | backgroundcheck.go
    /activities
        | ssntrace.go
    /worker
        | main.go
    /tests
        | tests.go
```

### Initialize Go project dependency framework

If you have created a similar project structure as noted above, run `go mod init` to create a new go module for this project.

```bash
mkdir backgroundcheck
cd backgroundcheck
go mod init
```

Module name will be something like `<repo>/backgroundcheck` .
