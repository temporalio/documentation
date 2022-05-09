---
id: index
title: How to use the Temporal PHP SDK
description: Add the Temporal PHP SDK to your project.
tags:
  - developer-guide
  - php
---

The Temporal TypeScript PHP provides a framework for Temporal Application development in the PHP language. The SDK contains the following tools:

- A Temporal Client to communicate with a Temporal Cluster
- APIs to use within your Workflows
- APIs to create and manage Worker Entities and Worker Processes

**Get the SDK**

The Temporal PHP SDK is available as composer package and can be installed using the following command in a root of your project:

```bash
composer require temporal/sdk
```

The Temporal PHP SDK requires the RoadRunner 2.0 application server and supervisor to run Activities and Workflows in a scalable way.

Install RoadRunner manually by dowloading its binary from the [release page](https://github.com/roadrunner-server/roadrunner/releases/tag/v1.9.2).

Or install RoadRunner through the CLI:

```bash
composer require spiral/roadrunner:v2.0 nyholm/psr7
./vendor/bin/rr get-binary
```
