---
id: introduction
title: Java SDK introduction
sidebar_label: Java SDK introduction
---

## Quick start

1. Add the [Temporal Java SDK](https://github.com/temporalio/sdk-java) to your project as a dependency:

**[Apache Maven](https://maven.apache.org/)**:

```maven
<dependency>
  <groupId>io.temporal</groupId>
  <artifactId>temporal-sdk</artifactId>
  <version>1.0.7</version>
</dependency>
```

**[Gradle Groovy DSL](https://gradle.org/)**:

```groovy
implementation 'io.temporal:temporal-sdk:1.0.7'
```

**Other**:

Addition include scripts are available, after you select your version, here: [https://search.maven.org/artifact/io.temporal/temporal-sdk](https://search.maven.org/artifact/io.temporal/temporal-sdk)

2. [Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.

## Reference

Java SDK reference is available here: [https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html)

## The basics

- [Workflows](/docs/java/workflows)
- [Activities](/docs/java/activities)
- [Workers](/docs/java/workers)
- [Task Queues](/docs/java/task-queues)

## Tutorials

- [Tutorial prerequisites](/docs/java/tutorial-prerequisites)
- [Run your first application](/docs/java/run-your-first-app-tutorial)
- [Build a "Hello World! app from scratch"](/docs/java/hello-world-tutorial)

## Application templates

- [Money transfer application template](https://github.com/temporalio/money-transfer-project-template-java)
- ["Hello World!" application template](https://github.com/temporalio/hello-world-project-template-java)

Additional Java application samples are available here: [https://github.com/temporalio/samples-java](https://github.com/temporalio/samples-java)
