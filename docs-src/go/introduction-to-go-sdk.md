---
id: introduction-to-go-sdk
title: Introduction to the Temporal Go SDK developer's guide
description: The Go SDK provides access to the Temporal programming model using idiomatic Go programming paradigms.
sidebar_label: Go SDK
tags:
  - go
  - dev guide
  - temporal sdk
---

Welcome to the Temporal Go SDK developer’s guide.

:::success Temporal Go SDK API reference

https://pkg.go.dev/go.temporal.io/sdk

:::

The Temporal Go SDK released on March 23, 2020.
This guide documents the concepts, features, and tools needed to create, test, and execute Temporal applications in Go.

The Temporal Go SDK enables developers to build, test, and execute Temporal applications in Go.

### Supported runtimes

**What are the supported Go runtimes?**

The Temporal Go SDK supports Go 1.18+.

Ensure you have the latest version of the Temporal Go SDK by checking [releases](https://github.com/temporalio/sdk-go/releases).

### Add to project

```shell
go get go.temporal.io/sdk
```

Import SDK packages in your code:

```go
import (
    "go.temporal.io/sdk/client"
    // other imports...
)
```

### Expected skills and experiences

**What Go programming skills and experiences should a developer have to succeed with the Go SDK?**

The Temporal Platform enables developers to build a wide range of applications that serve a variety of use cases.

We recommend that developers are equipped with some of the following skills to develop production-level Temporal Applications:

:::success Recommended

**Core fundamentals:**

- Go syntax and structure
- Variables, Types, and Structures
- Control flow: loops, conditionals
- Slices and Maps
- Basic I/O operations

**Go-specific principles:**

- Understanding Goroutines and Channels
- Error handling in Go
- Go Modules and Dependency Management
- Pointers in Go
- Structs, Interfaces, and Embedding
- Go Testing and Benchmarking

:::

:::info Nice to have

**Tools**

We recommend that developers have a beginner to moderate level of experience using a Go IDE, or a preferred editor with Go extensions, such as Visual Studio Code with Go extension.

**Testing**

We recommend that developers have some experience with Go's built-in testing framework.

**Code base version control**

We recommend that developers have some experience using a version control system, such as Git.

**Dependency management**

Being familiar with Go modules for dependency management can be beneficial.

**Listing and sorting**

Understanding SQL-like syntax and CRUD operational concepts can help utilize Temporal’s Visibility tools.

**Security**

We recommend having some understanding and experience with TLS, security certificates, and private keys for onboarding with Temporal Cloud or setting up a Self-Hosted Cluster.

**Privacy**

We advise having an understanding and experience with PII and sensitive information encryption for applications that handle user data.

:::

:::caution Complex and large-scale use cases

**Large scale use cases**

For intricate and vast use cases, having some experience with the following could be helpful:

- Deeper Go runtime understanding, including:
  - Go's memory model
  - Go garbage collection
- Design Patterns applicable to Go, such as Singletons or Factories.
- Distributed system architectures:
  - Event-driven architectures and how events drive processes in the context of Workflows.
- The distinctions between stateful vs. stateless processes.
- Implications of service scalability on performance and reliability.
- Ensuring fault tolerance and understanding supervisor systems for progress checks and resumptions.

:::

## Code samples and resources? {#additional-resources}

**Where can I find code samples and other resources to learn to use the Go SDK?**

- Continue reading this guide.
- [Documentation samples repository](https://github.com/temporalio/documentation-samples-java)
- [Go SDK samples repository](https://github.com/temporalio/samples-java)
- [Temporal 101 with Go](https://learn.temporal.io/courses/temporal_101/go): free introductory course.
- [Temporal 102 with Go](https://learn.temporal.io/courses/temporal_102/go): our free course that builds on Temporal 101.
- The [Go SDK](https://www.youtube.com/watch?v=-KWutSkFda8&list=PLl9kRkvFJrlRYHYaTPnsvE46szyMIZLdk&pp=iAQB) YouTube playlist
- Tutorials
  - [Build an eCommerce App With Temporal and Go](https://learn.temporal.io/tutorials/go/ecommerce/)

## How to contribute to the Temporal Go SDK? {#contribution}

The Temporal Go SDK is MIT licensed, and contributions are welcome.
Join us in the [Temporal #go-sdk Slack channel](https://t.mp/slack) or ask questions in the [Community Forum](https://community.temporal.io/)

We'd love your help in improving the Temporal Go SDK.
Please review our [contribution guidelines](https://github.com/temporalio/sdk-java/blob/master/CONTRIBUTING.md).
