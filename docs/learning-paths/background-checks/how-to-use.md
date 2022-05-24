---
id: how-to-use
title: How to use the Background Check application
description: Make sure you have Docker Desktop installed, clone the repo, and run `./start`.
sidebar_label: How to run the app
---

## What do I need to have installed to run the application?

Make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## How to run the application

Run Docker Desktop.

Clone the repo and run `./start`:

```
git clone git@github.com:temporalio/background-checks.git
cd background-checks
./start
```

This starts a new Docker Application with a stack of containers.

## How to monitor the application

When the application has started, you can navigate to Grafana at [http://localhost:8085/](http://localhost:8085/).

Click on Dashboards -> Home -> Temporal.
The Temporal dashboard contains information from metrics emitted from the Temporal Cluster and the Worker Process.
This information should provide insight into the Workflow Executions and Activity Executions.

## How to run a Background Check

**While pretending to be the Company HR person...**

From the project root, use `./run-cli` to execute the [`bgc-company start`](/learning-paths/background-checks/cli-reference/#start) command:

```bash
./run-cli bgc-company start --email your-email@example.com --package full
```

The main Workflow Execution is now viewable in the Temporal UI: [http://localhost:8080/](http://localhost:8080/).

The very first thing the Background Check application does is send an email message to the Candidate.
In this application we are using a single mailbox running on a single mail server running in one of the Docker containers.
This means that the Company HR person, Candidate, and Researcher personas receive their email in this mailbox.
Look at the "To" address to distinguish between personas in the mailbox.

The mailbox is accessible at [http://localhost:8025/](http://localhost:8025/).

**While pretending to be the Candidate...**

Open the email and follow the instructions to accept the Background Check.

Refresh the Temporal UI to see the new Child Workflow Executions that represent the individual Searches.

If the "standard" package is selected, the Searches complete and a report is generated.

If the "full" package is selected, the Background Check application sends an email message to a Researcher to manually verify employment history.

**While pretending to be the Researcher...**

Return to the mailbox to see the new email message and follow the instructions inside to verify employment history and allow the Background Check to proceed.

When all Searches have completed, the Background Check application sends an email message to the Company HR person with the report in it.

**While pretending to be the Company HR person...**

Check the mailbox again to find the Background Check report.

### How to check the status of a Background Check

The Company CLI has the ability to access the Background Checks currently in the system.

You can get a full list of Background Checks and their current status by using the `bgc-company list` command:

```
./run-cli bgc-company list
```

You can see the status of a specific Background Check by providing the `--email` modifier and a value:

```
./run-cli bgc-company list --email your-email@example.com
```

## How to cancel a Background Check

**While pretending to be the Company HR Person...**

Run the [`bgc-company cancel`](/learning-paths/background-checks/cli-reference/#cancel) command.

```
./run-cli bgc-company cancel --email your-email@example.com --id <Run Id>
```

You can obtain the Run Id from the Temporal Web UI ([http://localhost:8080/](http://localhost:8080/)).
