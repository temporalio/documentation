---
id: introduction-to-java-sdk
title: Introduction to the Temporal Java SDK developer’s guide
description: The Java SDK provides access to the Temporal programming model using idiomatic Java programming paradigms.
sidebar_label: Introduction
tags:
  - dev guide
  - java
  - temporal sdk
---

Welcome to Temporal Java SDK developer’s guide.

:::success Temporal Java SDK API reference

https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html

Short link: https://t.mp/java-api

:::

The [Temporal Java SDK](https://github.com/temporalio/sdk-java) released on March 28, 2020.
The Temporal Java SDK developers guide documents the concepts, features, and tools that you’ll use to create, test, and execute Temporal applications in Java.

### Supported runtimes

**What are the supported Java runtimes?**

Developing applications with the Temporal Java SDK requires Java 1.8+.

### Build configuration

[![Build status](https://badge.buildkite.com/663f6d1be81be6700c28c242b35905f20b68c4fda7b2c7c4e3.svg?branch=master)](https://buildkite.com/temporal/java-sdk-public) [![Coverage Status](https://coveralls.io/repos/github/temporalio/sdk-java/badge.svg?branch=master)](https://coveralls.io/github/temporalio/sdk-java?branch=master)

**Where can I get a build configuration?**

[Find the latest release](https://search.maven.org/artifact/io.temporal/temporal-sdk) of the Temporal Java SDK at Maven Central.

Add _`temporal-sdk`_ as a dependency to your _`pom.xml`_:

```
<dependency>
  <groupId>io.temporal</groupId>
  <artifactId>temporal-sdk</artifactId>
  <version>N.N.N</version>
</dependency>
```

or to _`build.gradle`_:

```
compile group: 'io.temporal', name: 'temporal-sdk', version: 'N.N.N'
```

### Expected skills and experiences

**What Java programming skills and experiences should a developer have to succeed with the Java SDK?**

The Temporal Platform enables developers to build a wide range of applications that serve a variety of use cases.

We recommend that developers are equipped with some of the following skills to develop production-level Temporal Applications:

:::success Recommended

**Core fundamentals:**

- Java Syntax and Structure
- Data Types
- Operators
- Control Statements: loops, conditionals
- Basic Input/Output
- Understanding of Java Virtual Machine (JVM)

**Object-oriented programming:**

- Classes and Objects
- Interfaces
- Inheritance
- Encapsulation
- Polymorphism

**Java language features:**

- Annotations
- Exception handling
- Collections Framework
- Java Stream API
- Lambdas and Functional Interfaces
- Threads and concurrency

:::

:::info Nice to have

**Tools**

We recommend that developers have a beginner to moderate level of experience using a Java IDE, such as IntelliJ IDEA or Eclipse

**Testing**

We recommend that developers have some experience with a testing library and framework such as JUnit or Mockito.

**Code base version control**

We recommend that developers have some experience using a version control system, such as Git.

**Dependency management**

We recommend that developers have some experience using a dependency management system such as Maven or Gradle.

**Listing and sorting**

We recommend that developers have some experience with SQL-like syntax and CRUD operational concepts to make use of Temporal’s Visibility tools.

**Security**

To onboard with Temporal Cloud or set up a Self-Hosted Cluster, we recommend that developers have some understanding and experience with TLS, security certificates, and private keys.

**Privacy**

For applications that process any amount of user data we recommend that developers have some understanding and experience with PII and sensitive information encryption.

:::

:::caution Complex and large scale use cases

**Large scale use cases**

For complex and large-scale use cases, having at least some experience with a variation of the following could be helpful:

- Deeper JVM understanding of the following:
  - Memory Management
  - Garbage Collection
  - JIT Compilation
- Design Patterns:
  - Singleton, Factory, Strategy, Observer, etc.
- Distributed system architectures
  - Event-driven architectures: Understanding of how events can drive processes and how they fit into Workflows.
  - Stateful vs. stateless processes: Knowledge about the advantages and pitfalls of both.
  - Scalability: Understanding the implications, of scaling services, on performance and reliability.
  - Fault tolerance: Knowledge of supervisor systems that check progress and resume after suspensions.

:::

### Code samples and resources {#additional-resources}

**Where can I find code samples and other resources to learn to use the Java SDK?**

- Continue reading this guide.
- Documentation samples repository → https://github.com/temporalio/documentation-samples-java
- Java SDK samples repository → https://github.com/temporalio/samples-java
- Temporal Java SDK Workshops → https://www.youtube.com/playlist?list=PLl9kRkvFJrlSNuTvL0dl3VE5GEe1HFtjf
- Getting started with the Temporal Java SDK tutorials → https://learn.temporal.io/getting_started/java/
- Temporal 101 course in Java → https://learn.temporal.io/courses/temporal_101/java

### Contribution {#contribution}

**How to contribute to the Temporal Java SDK?**

The Temporal Java SDK is MIT licensed, and contributions are welcome.
Join us in the [Temporal #java-sdk Slack channel](https://t.mp/slack) or ask questions in the [Community Forum](https://community.temporal.io/)

We'd love your help in improving the Temporal Java SDK. Please review our [contribution guidelines](https://github.com/temporalio/sdk-java/blob/master/CONTRIBUTING.md).
