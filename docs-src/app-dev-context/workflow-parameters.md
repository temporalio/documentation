---
id: workflow-parameters
title: How to define Workflow parameters
description: Temporal Workflows may have any number of custom parameters.
sidebar_label: Workflow parameters
tags:
  - guide-context
---

Temporal Workflows may have any number of custom parameters.
However, it is strongly recommended that objects are used as parameters, so that the object's individual fields may be altered without breaking the signature of the Workflow.
All Workflow Definition parameters must be serializable.
