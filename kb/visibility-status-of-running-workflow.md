---
slug: visibility-status-of-running-workflow
title: Check the Visibility status of a Workflow
tags:
  - kb-article
date: 2022-11-7T00:00:00Z
---

To check how many Workflows are currently running, you must set up the [Advanced Visibility](/concepts/what-is-advanced-visibility) feature, which depends on an integration with Elasticsearch.

<!-- truncate -->

Once you've integrated Elasticsearch with your Temporal Cluster, you can get information into the visibility of your running Workflows.

Choose from any of the following methods to get visibility on your running Workflows.

## Using tctl commands

You can get information about running Workflows by running one of the following `tctl` commands.

```bash
tctl workflow list --query "ExecutionStatus='Running'"
tctl workflow count --query "ExecutionStatus='Running'"
```

:::note

If you receive the following error message, you need to configure the Advanced Visibility feature.

```bash
Error: unable to count workflows: Operation not supported. Please use on Elasticsearch
('export TEMPORAL_CLI_SHOW_STACKS=1' to see stack traces)
```

:::

For more examples, see [List Filter examples](/visibility#example-list-filters).

## Using APIs

Alternatively, you can use the following APIs with your Visibility Query.

- [ListWorkflowExecutions](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto#L279)
- [CountWorkflowExecutions](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto#L291)

It isn’t recommended using the APIs with high-rate calls.

For more information, see [Search Attributes](/concepts/what-is-a-search-attribute/).

:::note

All APIs lists are paginated.

:::

## Using SDKs

For information on checking the visibility of a Workflow programmatically, see the [Search Attributes](/application-development/observability#search-attributes) section on the Observability page.
