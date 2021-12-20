---
id: how-to-use-the-background-check-application
title: How to use the Background Check application
description: TODO
sidebar_label: How to run the app
---

## What do I need to have installed to run the application?

Make sure you have the following installed:

- Go version >= x.x.x
- Docker Desktop

## How to run the application

Run Docker Desktop.

Clone the repo and run `./start`:

```
git clone git@github.com:temporalio/background-checks.git
cd background-checks
./start
```

This starts up a new Docker Application with a stack of containers.

### How to run a Background Check

**While pretending to be the Company HR person...**

From the project root use `./run-cli` to execute the [`bgc-company start`](/docs/learning-paths/long-running-human-driven-workflow/cli/#start) command:

```bash
./run-cli bgc-company start --email your-email@example.com --package full
```

The main Workflow Execution is now viewable in the [Temporal UI - http://localhost:8088/](http://localhost:8088/)

The very first thing the Background Check application does is send an email to the Candidate.
For this Learning Path we are using a single mailbox using a single mail server running in one of the Docker containers.
This means that the Company HR person, Candidate, and Researcher personas receive their emails in this mailbox.
Use the "To" address to distinguish between personas.

The mailbox is accessible at [http://localhost:8025/](http://localhost:8025/).

**While pretending to be the Candidate..**

Open the email and follow the instructions to accept the Background Check.

Refresh the Temporal UI to see the new Child Workflow Executions that represent the individual Searches.

If the "standard" package is selected the Searches complete and a report is generated.

If the "full" package is selected the Background Check application sends an email to a Researcher to manually verify Employment history.

**While pretending to be the Researcher...**

Head back over to the mailbox to see the new email and follow the instructions inside to verify employment history and allow the Background Check to proceed.

When all the Searches have completed, the Background Check application compiles a report and sends it in an email back to the Company HR person.

**While pretending to be the Company HR person...**

Check the mailbox again to find the Background Check report.
