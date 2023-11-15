---
id: versioning-intro
title: Introduction to versioning Workflows in Go
description: Introduction to versioning Workflows in Go
sidebar_label: Introduction to versioning
tags:
  - go sdk
  - workflows
  - versioning
  - patching
  - determinism
---

The Temporal Platform requires that Workflow code is [deterministic](/concepts/what-is-a-workflow-definition#deterministic-constraints).
Because of that requirement, the Temporal Go SDK offers two dedicated versioning features.

- [Workflow Patching APIs](/go/patching)
- [Worker Build Ids](/go/how-to-use-worker-versioning-in-go)
