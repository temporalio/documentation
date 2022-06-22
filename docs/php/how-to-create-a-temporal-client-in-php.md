---
id: how-to-create-a-temporal-client-in-php
title: How to create a Temporal Client in PHP
sidebar_label: Temporal Client
---

The following example represents a console command that starts a Workflow, prints its IDs, and then waits for its result:

<!--SNIPSTART php-hello-client {"enable_source_link": true}-->
<!--SNIPEND-->

The `WorkflowClientInterface` in the snippet is an entry point to get access to Workflow.
Use an instance of `WorkflowClientInterface` to create, retrieve, or start a Workflow .
Here we create an instance of `GreetingWorkflowInterface` with a Workflow Execution Timeout of 1 minute.

Then we print some information and start the Workflow.
