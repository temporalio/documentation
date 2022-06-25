---
id: what-is-a-temporal-sdk
title: What is a Temporal SDK?
sidebar_label: Temporal SDK
description: A Temporal SDK is a language-specific library that offers APIs to construct and use a Temporal Client to communicate with a Temporal Cluster, develop Workflow Definitions, and develop Worker Programs.
tags:
  - explanation
---

A Temporal SDK is a language-specific library that offers APIs to do the following:

1. Construct and use a [Temporal Client](/concepts/what-is-a-temporal-client)
2. Develop [Workflow Definitions](/concepts/what-is-a-workflow-definition)
3. Develop [Worker Programs](/concepts/what-is-a-worker-program)

A Temporal SDK enables you to write your application code using the full power of the programming language, while the Temporal Platform handles the durability, reliability, and scalability of the application.

Temporal currently offers the following SDKs:

- [How to use the Go SDK](/go/index)
- [How to use the Java SDK](/java/)
- [How to use the PHP SDK](/php/introduction)
- [How to use the TypeScript SDK](/typescript/introduction)

Each SDK emits metrics which can be ingested into monitoring platforms.
See the [SDK metrics reference](/references/sdk-metrics) for a complete list.
