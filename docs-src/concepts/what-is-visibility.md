---
id: what-is-visibility
title: What is Visibility?
sidebar_label: Visibility
description: The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.
tags:
  - term
---

The term [Visibility](/visibility), within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view, filter, and search for Workflow Executions that currently exist within a Cluster.

The [Visibility store](/cluster-deployment-guide#visibility-store) in your Temporal Cluster stores persisted Workflow Execution Event History data and is set up as a part of your [Persistence store](/concepts/what-is-a-temporal-cluster#persistence) to enable listing and filtering details about Workflow Executions that exist on your Temporal Cluster.

- [How to set up a Visibility store](/cluster-deployment-guide#visibility-store)

A Visibility store can be configured to provide [Standard Visibility](/visibility#standard-visibility) and [Advanced Visibility](/visibility#advanced-visibility) features.
