---
id: index
title: How to use the Temporal Java SDK
sidebar_label: Java How-to
description: Add the Temporal Java SDK to your project.
tags:
  - developer-guide
  - Java
---

The Temporal Java SDK provides a framework for Temporal Application development in Java.
The SDK contains the following tools:

- A Temporal Client to communicate with a Temporal Cluster
- APIs to use within your Workflows
- APIs to create and manage Worker Entities and Worker Processes

## Get the SDK

1. Add the [Temporal Java SDK](https://github.com/temporalio/sdk-java) to your project as a dependency:

   **[Apache Maven](https://maven.apache.org/)**:

   ```maven
   <dependency>
     <groupId>io.temporal</groupId>
     <artifactId>temporal-sdk</artifactId>
     <version>1.9.1</version>
   </dependency>
   ```

   **[Gradle Groovy DSL](https://gradle.org/)**:

   ```groovy
   implementation 'io.temporal:temporal-sdk:1.9.1'
   ```

   **Other**:

   Additional scripts for each SDK version are available here: [https://search.maven.org/artifact/io.temporal/temporal-sdk](https://search.maven.org/artifact/io.temporal/temporal-sdk). Select an SDK version to see available scripts.

2. [Install and run the Temporal Server](/docs/clusters/quick-install) using `docker compose`.

## Resources

- [Java SDK API reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html)

- [Java SDK samples library](/docs/samples-library/#java)

### Tutorials

- [Tutorial prerequisites](/docs/java/tutorial-prerequisites)

- [Run your first application](/docs/java/run-your-first-app-tutorial)

- [Build a "Hello World!" app from scratch](/docs/java/hello-world-tutorial)

## Workshops

- [Intro to Temporal Java SDK](https://www.youtube.com/watch?v=VoSiIwkvuX0)

- [Java SDK Workshop #2](https://www.youtube.com/watch?v=h-TSDMULCf0)

## The basics

- [Workflows](/docs/java/workflows)

- [Activities](/docs/java/activities)

- [Workers](/docs/java/workers)

- [Task Queues](/docs/java/task-queues)

- [Signals](/docs/java/signals)

- [Queries](/docs/java/queries)
