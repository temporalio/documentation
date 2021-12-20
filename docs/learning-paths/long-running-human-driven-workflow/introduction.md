---
id: introduction
title: Welcome to the Long Running Human Driven Workflow Learning Path
description: TODO
sidebar_label: Introduction
---

## What is the goal of the Long Running Human Driven Workflow Learning Path?

The goal of this Learning Path is to teach you, the developer, how to think about building Temporal Applications that have Long Running Human Driven Workflows using a Temporal SDK, by leading you through a comprehensive implementation within the context of a real-life use case.

## What is a Long Running Human Driven Workflow?

A Long Running Human Driven Workflow is a Temporal Workflow Execution that could be Running (be in an Open state) for hours, days, weeks, or even years, and requires input from a real person to progress.

## What is the real-life use case?

A large company (Name TBD) routinely hires new employees. Every Candidate's job offer is subject to a Background Check.

Some of the more common checks in a Background Check include:

- SSN trace for known aliases and addresses
- Federal criminal records check
- State criminal records check
- County civil records check
- County criminal records check
- Municipal criminal records check
- Employment verification
- Education verification
- Motor vehicle history
- Drug & health screen

Depending on the position, the Background Check of the Candidate could include any the individual checks.

If the Candidate is associated with multiple addresses, then multiple state level, county level, and municipal level checks could occur.

Some of the checks can be done against public facing databases, others may require parsing PDFs or images.

With each individual check, there is an opportunity for something to happen that can cause a delay.

The Company is fully aware that the current methods used to conduct a Background Check for a Candidate are not scaling with the rate of hiring.

So, the Company wants to automate as much of the Background Check process as it can to save time and improve the experience for everyone involved.

If this sounds familiar, it is because Checkr has built a product that does this.

Checkr is the leading tech company in the Background Check industry. It should not be a surprise that one of the most common reasons to use Checkr is for conducting Background Checks as part of the hiring process.

For this learning path, we are going to walk through some of the problems that the {Company} might face while automating the Background Check process and how they can solve them by using the Temporal Platform, just as Checkr did.

Read Checkr use case here: [https://docs.temporal.io/blog/how-temporal-simplified-checkr-workflows](https://docs.temporal.io/blog/how-temporal-simplified-checkr-workflows)

## What are the technical concepts introduced in this Learning Path?

- Temporal Client
  - Spawning a Workflow Execution
    - Workflow Ids
    - Workflow Id Reuse Policy
  - Getting the result of a Workflow Execution
  - Canceling a Workflow Execution
  - Sending a Signal
  - Sending a Query
  - Temporal Visibility List APIs
    - Advanced Visibility
    - List Filters
    - Search Attributes (default at least)
- Temporal Workflow APIs
  - Handling a Signal
    - Go specific Signal Channels (Selectors?)
  - Handling a Query
  - Executing Activities
    - Activity Timeouts
    - Activity Retries
  - Executing Child Workflows
- Writing Workflow Definitions
  - Workflow Types
- Versioning Workflow Definitions
- Writing Activity Definitions
  - Activity Types
- Temporal Workers:
  - Creating Worker Entities
  - Developing Worker Programs
  - Managing and scaling Workers
    - Task Queues
- Custom Data Converter
- Temporal Web UI
