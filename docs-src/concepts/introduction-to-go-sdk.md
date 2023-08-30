---
id: introduction-to-go-sdk
title: Introduction to the Temporal Go SDK developer's guide
description: The Temporal Go SDK provides the benefits of both the Temporal programming model and the ease of writing in Go.
sidebar_label: Go SDK
tags:
  - guide-context
---

Welcome to the Temporal Go SDK developer’s guide!

Temporal Python SDK first released on September 29, 2020, and has been enabling Python developers to build Temporal Applications ever since.

This guide documents the concepts, features, and tools needed to create, test, and execute Temporal applications in Go.

## What Go programming skills and experiences are useful when using the Go SDK?

The Temporal Platform enables developers to build a wide range of applications that serve a wide range of use cases. 

We recommend that developers possess at least a moderate level of experience in practicing the following skills to develop production-level Temporal Applications:

### Core fundamentals

- Go syntax and structure
- Data types
  - [structs](https://pkg.go.dev/go/types@go1.21.0#Struct)
- Operators
- Control statements
  - for loops
  - conditionals
- Basic input/output

### Object-oriented programming

- Interfaces
- Pointers

### Go language features

- Goroutines
- Channels
- Concurrency patterns -  parallelism, producer-consumer, etc.
- Context handling
- Defer and panic handling
- Error handling
- [Go toolchain](https://go.dev/doc/tutorial/create-module)

### Recommendations

Developers should have some experience with the Go testing package and the open-source Testify library.

In addition, developers should also have a beginner to moderate level of experience with an IDE such as Visual Studio Code, GoLand, or vim.

Developers should have some experience using a version control system, such as Git.

For very complex and large-scale use cases, having at least some experience with a variation of the following could be helpful:

#### Golang deep dive

- Reflection
- Generics
- Memory management

#### Design patterns
- Creational: Factory, Singleton, Object Pool, Builder, etc.
- Stability: Bulkheads, Deadline, etc.
#### Databases
- Familiarity with SQL or NoSQL databases
- CRUD operational concepts
#### Distributed system architectures
- **Event-driven architectures**: Understanding of how events can drive processes and how they fit into workflows.
- **Stateful vs. stateless processes**: Knowledge about the advantages and pitfalls of both.
- **Scalability**: Understanding the implications, of scaling services, on performance and reliability.
- **Fault tolerance**: Knowledge of supervisor systems that monitor progress and resume after suspensions.

## Where is the Temporal Go SDK API reference?

For the complete API reference, see our page on [go.dev](https://pkg.go.dev/go.temporal.io/sdk).

## Where can I find code samples?

Code samples are integrated into this guide.
Find those code samples in the [documentation-samples-go](https://github.com/temporalio/documentation-samples-go) repository on GitHub, or go to the [SDK samples](https://github.com/temporalio/samples-go) repository.

## What are the supported Go versions?

The Temporal Go SDK supports Go 1.18+.

## Where can I get a build configuration?

Add the Temporal Go SDK to your project.

```
go get go.temporal.io/sdk
```

## What are other resources for learning how to use the Go SDK?

Further resources for learning how to use the Go SDK include the following:

- [Temporal 101 with Go](https://learn.temporal.io/courses/temporal_101/go): our free introductory course.
- The [Go SDK](https://www.youtube.com/watch?v=-KWutSkFda8&list=PLl9kRkvFJrlRYHYaTPnsvE46szyMIZLdk&pp=iAQB) YouTube playlist
- Tutorials
    - [Build an eCommerce App With Temporal and Go](https://learn.temporal.io/tutorials/go/ecommerce/)
    - Build a Subscription App with Temporal and Go
- Blog posts
    - [Workflows as Actors: Is it really possible?](https://temporal.io/blog/workflows-as-actors-is-it-really-possible)
    - [Actors and Workflows Part 2: Building a Customer Loyalty Program](https://temporal.io/blog/actors-and-workflows-part-2)
    - [Saga Pattern Made Easy](https://temporal.io/blog/saga-pattern-made-easy)
    - [Compensating Actions, Part of a Complete Breakfast with Sagas](https://temporal.io/blog/compensating-actions-part-of-a-complete-breakfast-with-sagas)
    - [Failure Handling in Practice](https://temporal.io/blog/failure-handling-in-practice)
    - [Tips and Tricks for Temporal Developer Productivity](https://temporal.io/blog/temporal-tips-tricks-1)
- [go-patterns](https://github.com/tmrts/go-patterns): a comprehensive list of design patterns that apply to Go as a whole.

## How to contribute to the Temporal Go SDK?

We'd love your help in improving the Temporal Go SDK. 
Please review our [contribution guidelines](https://github.com/temporalio/sdk-java/blob/master/CONTRIBUTING.md).