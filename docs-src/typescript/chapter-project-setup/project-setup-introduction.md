---
id: project-setup-introduction
title: Set up a new Temporal Application introduction
description:
sidebar_label: Project setup introduction
tags:
  - introduction
  - developer guide
  - project setup
---

The first step to creating a new Temporal Application is to set up your development environment.
This chapter walks through the steps to do that using the TypeScript SDK.

:::competency Construct a new Temporal Application project

This chapter of the Temporal TypeScript SDK developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application using Go.

By the end of this section you will know how to construct a new Temporal Application project.

Learning objectives:

- Describe the tools available and recommended to develop Workflows.
- Describe the code that actually forms a Temporal application.
- Implement an appropriate testing framework.

Much of the information in this chapter is also covered in the [Temporal 101 course](https://learn.temporal.io/courses/temporal_101/)

:::

This chapter introduces the [Background Check use case](https://learn.temporal.io/examples/go/background-checks/#what-is-the-real-life-use-case) and a sample application as a means to contextualize the information.
Future developer guide chapters build on this use case and sample application.

There are three ways to follow this guide:

- [Use a local dev server](/typescript/chapter-project-setup/choose-dev-cluster#local-dev-server)
- [Use Temporal Cloud](/typescript/chapter-project-setup/choose-dev-cluster#temporal-cloud)
- [Use a self-hosted environment such as Docker](/typescript/chapter-project-setup/choose-dev-cluster#self-hosted-temporal-cluster)

Read more in the [Choose a development Cluster](/typescript/chapter-project-setup/choose-dev-cluster) section.

In this chapter you will do the following:

1. Download the Temporal CLI.
2. Choose your development Cluster.
3. Create a Namespace on your development Cluster.
4. Copy boilerplate code into your IDE.
5. Run your the Worker.
6. Start the Workflow using the CLI.
7. Explore the Web UI to view the status of the Workflow and confirm polling Workers.
8. Add a testing framework and unit tests to the application
9. Run the application unit tests
