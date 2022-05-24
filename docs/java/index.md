---
id: index
title: How to use the Temporal Java SDK
sidebar_label: Java How-to
description: Add the Temporal Java SDK to your project.
tags:
  - developer-guide
  - Java
---

[![Build status](https://badge.buildkite.com/663f6d1be81be6700c28c242b35905f20b68c4fda7b2c7c4e3.svg?branch=master)](https://buildkite.com/temporal/java-sdk-public)

The Temporal Java SDK provides a framework for Temporal Application development in Java.
The SDK contains the following tools:

- A Temporal Client to communicate with a Temporal Cluster
- APIs to use within your Workflows
- APIs to create and manage Worker Entities and Worker Processes

**Get the SDK**

Add the [Temporal Java SDK](https://github.com/temporalio/sdk-java) to your project as a dependency:

**[Apache Maven](https://maven.apache.org/)**:

```maven
<dependency>
  <groupId>io.temporal</groupId>
  <artifactId>temporal-sdk</artifactId>
  <version>1.11.0</version>
</dependency>
```

**[Gradle Groovy DSL](https://gradle.org/)**:

```groovy
implementation 'io.temporal:temporal-sdk:1.11.0'
```

**Other**:

Additional scripts for each SDK version are available here: [https://search.maven.org/artifact/io.temporal/temporal-sdk](https://search.maven.org/artifact/io.temporal/temporal-sdk).
Select an SDK version to see available scripts.

**Are there executable code samples?**

You can find a complete list of executable code samples in the [samples library](/samples-library/#java), which includes Temporal Java SDK code samples from the temporalio/samples-java repo.
Additionally, several of the [Java SDK Tutorials](/learning-paths) are backed by a fully executable template application.

**Where is the Java SDK technical reference?**

The [Java SDK API reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html) is published to [javadoc.io](https://www.javadoc.io/).

**Where can I find video demos?**

[Temporal Java SDK YouTube playlist](https://www.youtube.com/playlist?list=PLl9kRkvFJrlQ8KsM6m9cFfCeQegq_B8x4)
