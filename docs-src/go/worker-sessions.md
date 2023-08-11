---
id: worker-sessions
title: How to use Worker Session APIs
sidebar_label: Worker Sessions
description: To use Worker Sessions for Activity Executions the Worker must be enabled to use Sessions for the Workflows and Activities it is registered with.
tags:
  - developer-guide-doc-type
  - api
  - sessions
  - workers
  - go sdk
ssdi:
  - This feature is currently available only in the Go SDK.
---

A Worker Session is a feature that provides a straightforward API for [Task Routing](/concepts/what-is-task-routing) to ensure that Activity Tasks are executed with the same Worker without requiring you to manually specify Task Queue names.
