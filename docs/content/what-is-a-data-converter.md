---
id: what-is-a-data-converter
title: What is a Data Converter
description: A Data Converter is a component that transforms data provided to or received from a Workflow Execution or Activity Execution.
tags:
  - explanation
---

A Data Converter is a component that transforms data provided to or received from a Workflow Execution or Activity Execution.

There is a Data Converter provided by each Temporal SDK, that is used by default to serialize and deserialize data that exists in the Temporal Platform.

Applications may supply their own custom Data Converter that can be used to not only serialize, but encrypt the data as well.
