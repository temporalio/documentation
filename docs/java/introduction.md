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
  <version>1.5.0</version>
</dependency>
```

**[Gradle Groovy DSL](https://gradle.org/)**:

```groovy
implementation 'io.temporal:temporal-sdk:1.5.0'
```

**Other**:

Addition include scripts are available, after you select your version, here: [https://search.maven.org/artifact/io.temporal/temporal-sdk](https://search.maven.org/artifact/io.temporal/temporal-sdk)

2. [Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.

## Resources

- [Java SDK API reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html)

- [Java SDK samples library](/docs/samples-library/#java)

### Tutorials

- [Tutorial prerequisites](/docs/java/tutorial-prerequisites)

- [Run your first application](/docs/java/run-your-first-app-tutorial)

- [Build a "Hello World!" app from scratch](/docs/java/hello-world-tutorial)

## Workshops

- Intro to Temporal Java SDK

import { ResponsivePlayer } from '../../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=VoSiIwkvuX0' />

## The basics

- [Workflows](/docs/java/workflows)

- [Activities](/docs/java/activities)

- [Workers](/docs/java/workers)

- [Task Queues](/docs/java/task-queues)

- [Signals](/docs/java/signals)

- [Queries](/docs/java/queries)
