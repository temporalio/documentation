---
id: continue-as-new
title: Continue-As-New
sidebar_label: Continue-As-New
description: Continue-As-New is a mechanism by which the latest relevant state is passed to a new Workflow Execution, with a fresh Event History.
slug: /workflow-execution/continue-as-new
keywords:
  - continue-as-new
  - workflow chain
  - workflow state
tags:
  - Concepts
  - Workflows
---

This page discusses [Continue-As-New](#continue-as-new) and how to decide [when to use it](#when).

## What is Continue-As-New? {#continue-as-new}

Continue-As-New allows you to checkpoint your Workflow's state and start a fresh Workflow.

There are two main reasons you might want to start a new Workflow:

- A Workflow Execution with a long, or large [Event History](/workflow-execution/event#event-history), such as one calling many Activities, may bog down and have performance issues.
  It could even generate more Events than allowed by the [Event History limits](/workflow-execution/event#event-history-limits).
- A Workflow Execution can hit [Workflow Versioning](/workflow-definition#workflow-versioning) problems if it started running on an older version of your code and then begins executing on a newer version.

Your goal is to create a new Workflow with a fresh history that picks up where your last one left off.
First, pass your latest relevant state into Continue-As-New.
This hands it to a new Execution in the [Execution Chain](/workflow-execution#workflow-execution-chain).
This state is passed in as arguments to your Workflow.
The parameters are typically optional and left unset by the original caller of the Workflow.

The new Workflow Execution has the same Workflow Id, but a different Run Id, and starts its own Event History.

You can repeat Continue-As-New as often as needed, which means that your Workflow can run forever.
Workflows that do this are often called Entity Workflows because they represent durable objects, not just processes.

- [How to Continue-As-New using the Go SDK](/develop/go/continue-as-new#how)
- [How to Continue-As-New using the Java SDK](/develop/java/continue-as-new)
- [How to Continue-As-New using the PHP SDK](/develop/php/continue-as-new)
- [How to Continue-As-New using the Python SDK](/develop/python/continue-as-new#how)
- [How to Continue-As-New using the TypeScript SDK](/develop/typescript/continue-as-new)
- [How to Continue-As-New using the .NET SDK](/develop/dotnet/continue-as-new)

## When in your Workflow is it right to Continue-As-New? {#when}

Temporal will tell your Workflow when it's approaching performance or scalability problems.
Find out if it's time by checking Continue-As-New Suggested in your Workflow at spots in your implementation where you are ready to checkpoint your state.

To prevent long-running Workflows from running on stale versions of code, you may also want to Continue-as-New periodically, depending on how often you deploy. This makes sure you're running only a couple of versions, which avoids some backwards compatibility problems.

- [Determine when to Continue-As-New using the Go SDK](/develop/go/continue-as-new#when)
- [Determine when to Continue-As-New using the Java SDK](/develop/java/continue-as-new)
- [Determine when to Continue-As-New using the PHP SDK](/develop/php/continue-as-new)
- [Determine when to Continue-As-New using the Python SDK](/develop/python/continue-as-new#when)
- [Determine when to Continue-As-New using the TypeScript SDK](/develop/typescript/continue-as-new)
- [Determine when to Continue-As-New using the .NET SDK](/develop/dotnet/continue-as-new)
