---
id: workflow-data-classes-initial-steps
title: Building Resilient Workflows with Data Classes
sidebar_label: Building Resilient Workflows
description: Discusses the initial steps and considerations in using data classes for creating resilient Temporal workflows.
tags:
  - guide-python-temporal
  - initial-resilience-steps
---

To create a resilient Workflow without necessitating versioning, start by implementing a data class.
Data classes provide compatibility and flexibility for your Workflow's inputs and outputs.
This approach future-proofs your Workflow against changes in data requirements.
