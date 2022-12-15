---
id: what-is-a-temporal-sdk
title: What is a Temporal SDK?
sidebar_label: Temporal SDK
description: A Temporal SDK is a language-specific library that offers APIs to construct and use a Temporal Client to communicate with a Temporal Cluster, develop Workflow Definitions, and develop Worker Programs.
tags:
  - term
  - explanation
---

A Temporal SDK is a language-specific library that offers APIs to do the following:

1. Construct and use a [Temporal Client](/concepts/what-is-a-temporal-client)
2. Develop [Workflow Definitions](/concepts/what-is-a-workflow-definition)
3. Develop [Worker Programs](/concepts/what-is-a-worker-program)

A Temporal SDK enables you to write your application code using the full power of the programming language, while the Temporal Platform handles the durability, reliability, and scalability of the application.

Temporal currently offers the following SDKs:

- [Get started with the Go SDK](/application-development/foundations/?lang=go#add-your-sdk)
- [Get started with the Java SDK](/application-development/foundations/?lang=java#add-your-sdk)
- [Get started with the PHP SDK](/application-development/foundations/?lang=php)
- [Get started with the Python SDK](/application-development/foundations/?lang=python#add-your-sdk)
- [How to use the TypeScript SDK](/application-development/foundations/?lang=typescript#add-your-sdk)

Each SDK emits metrics which can be ingested into monitoring platforms.
See the [SDK metrics reference](/references/sdk-metrics) for a complete list.

### Auth

Temporal offers methods of authenticating and authorizing client API calls within our SDKs.

### SDKs in development

The following SDKs are in alpha/pre-alpha development stages, but are not yet supported in the Developer's guide:

- [.NET](https://github.com/temporalio/sdk-dotnet)
- [Rust](https://github.com/temporalio/sdk-core)
- [Ruby](https://github.com/temporalio/sdk-ruby)

### Third-party SDKs

The following third-party SDKs exist but are not supported in the [Developer's guide](/application-development):

- [Clojure](https://github.com/manetu/temporal-clojure-sdk) - from [@Manetu](https://github.com/manetu)
- [Scala](https://github.com/vitaliihonta/zio-temporal) from [@vitaliihonta](https://github.com/vitaliihonta)
- [Ruby](https://github.com/coinbase/temporal-ruby) from [@coinbase](https://github.com/coinbase)
