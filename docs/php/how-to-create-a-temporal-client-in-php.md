---
id: how-to-create-a-temporal-client-in-php
title: How to create a Temporal Client in PHP
sidebar_label: Temporal Client
---

The following example represents a console command that starts a workflow, prints its IDs, and then waits for its result:

<!--SNIPSTART php-hello-client {"enable_source_link": true}-->
<!--SNIPEND-->

In the snippet above we use `WorkflowClientInterface` - an entry point to get access to Workflows.
Once you need to create, retrieve, or start a workflow you should use an instance of `WorkflowClientInterface`.
Here we create an instance of `GreetingWorkflowInterface` with execution timeout of 1 minute.

Then we print some information and start the Workflow.
