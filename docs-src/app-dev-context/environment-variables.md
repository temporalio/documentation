---
id: environment-variables
title: How to read and pass environment variables
description: Environment variables can be provided in the normal way for our language to our Client, Worker, and Activity code.
sidebar_label: Environment variables
tags:
  - guide-context
---

Environment variables can be provided in the normal way for our language to our Client, Worker, and Activity code.
They can't be used normally with Workflow code, as that would be [nondeterministic](workflows#intrinsic-non-deterministic-logic) (if the environment variables changed between Workflow replays, the code that used them would behave differently).

Most of the time, you can provide environment variables in your Activity function; however, if you need them in your Workflow functions, you can use the following options:

- Provide environment variables as arguments when starting the Workflow.
- Call a Local Activity at the beginning of the Workflow that returns environment variables.

In either case, the environment variables will appear in Event History, so you may want to use an [encryption Data Converter](/concepts/what-is-a-data-converter/#encryption).
