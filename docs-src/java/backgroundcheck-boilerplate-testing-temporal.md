---
id: backgroundcheck-boilerplate-testing-temporal
title: Testing Activities and Workflows.
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test frameworks
tags:
  - guide-context
---

The Temporal Java SDK provides a test framework to facilitate Workflow unit and integration testing.
The test framework provides the `TestWorkflowEnvironment` and `TestActivityEnvironment` classes which includes an in-memory implementation
of the Temporal service that supports automatic time skipping. This allows you to
easily test long-running Workflows in seconds, without having to change your Workflow code.

You can use the provided testing environments with a Java unit testing framework
of your choice, such as JUnit. This guide will use JUnit 5.

### Setup testing dependencies

To start using the Java SDK test framework, you need to add [`io.temporal:temporal-testing`](https://search.maven.org/artifact/io.temporal/temporal-testing)
as a dependency to your project:

**[Apache Maven](https://maven.apache.org/)**:

```xml
<dependency>
    <groupId>io.temporal</groupId>
    <artifactId>temporal-testing</artifactId>
    <version>1.20.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.5.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.1.1</version>
    <scope>test</scope>
</dependency>
```

**[Gradle Groovy DSL](https://gradle.org/)**:

```groovy
testImplementation group: 'io.temporal', name: 'temporal-testing', version: '1.20.1'
testImplementation group: 'junit', name: 'junit-jupiter', version: '5.5.2'
testImplementation group: 'org.mockito', name: 'mockito-core', version: '5.1.1'
testImplementation group: 'org.mockito', name: 'mockito-junit-jupiter', version: '5.3.1'
```

Make sure to set the version that matches your dependency version of the [Temporal Java SDK](https://github.com/temporalio/sdk-java).
