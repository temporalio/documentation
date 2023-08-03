---
id: workflow-parameters
title: How to define Workflow parameters
description: Temporal Workflows may have any number of custom parameters.
sidebar_label: Workflow parameters
tags:
  - developer-guide-doc-type
  - go sdk
  - workflow parameters
  - workflows
  - workflow definition
---

Temporal Workflows may have any number of custom parameters.
However, we strongly recommend that objects are used as parameters, so that the object's individual fields may be altered without breaking the signature of the Workflow.
All Workflow Definition parameters must be serializable.
