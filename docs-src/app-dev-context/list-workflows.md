---
id: list-workflows
title: How to list Workflows
description: List Workflows from the Client.
sidebar_label: List Workflows
tags:
  - guide-context
---

A List Workflow is a method to retrieve Workflow Executions based on a Query or Filter, allowing you to find and view a list of relevant Workflows.

You can use a Query to include one or more conditions to specify a Workflow Execution’s characteristics, such as Workflow Id, Type, or start and end time.

The Workflow Executions retrieved from a List Workflow query can be sorted by a specific property in either ascending or descending order. Depending on the query, the Workflow Executions may be sorted by `StartTime` in descending order when listing open Workflows, and sorted by `CloseTime` in descending order for other queries.

For advanced query functionality, an ElasticSearch-based visibility feature must be used as of the 1.18 server release.
