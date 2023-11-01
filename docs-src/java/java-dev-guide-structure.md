---
id: java-dev-guide-structure
title: Temporal Java SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Guide structure
tags:
  - java
  - dev guide
  - guide structure
---

:::info Temporal Java SDK API reference

https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html

Short link: https://t.mp/java-api

:::

The Temporal Java SDK developer's guide is arranged in the following way:

- [**Introduction to the Java SDK**](/java/introduction-to-java-sdk)

  - [Supported runtimes](/java/introduction-to-java-sdk#supported-runtimes)
  - [Build configuration](/java/introduction-to-java-sdk#build-configuration)
  - [Expected skills and experiences](/java/introduction-to-java-sdk#expected-skills-and-experiences)
  - [Additional resources](/java/introduction-to-java-sdk#additional-resources)
  - [Contribution](/java/introduction-to-java-sdk#contribution)

- [**Set up a new project**](/java/project-setup-introduction)

  - [Install the Temporal CLI](/java/install-cli)
  - [Choose a development Cluster](/java/choose-dev-cluster)
  - [Boilerplate application code](/java/project-structure)
  - [Start a Workflow using the CLI](/java/backgroundcheck-boilerplate-start-workflow)
  - [Add a testing framework](/java/backgroundcheck-boilerplate-testing-temporal)

- [**Foundations**](/java/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

  - [Run a development Cluster](/dev-guide/java/foundations#run-a-dev-cluster)
  - [Add an SDK to your project](/dev-guide/java/foundations#add-your-sdk)
  - [Create a Temporal Client](/dev-guide/java/foundations#connect-to-a-cluster)
  - [Develop a basic Workflow Definition](/dev-guide/java/foundations#develop-workflows)
  - [Develop a basic Activity Definition](/dev-guide/java/foundations#develop-activities)
  - [Call to execute an Activity](/dev-guide/java/foundations#activity-execution)
  - [Run a Worker Process](/dev-guide/java/foundations#run-worker-processes)
  - [Start a Workflow Execution](/dev-guide/java/foundations#start-workflow-execution)

- [**Features**](/dev-guide/java/features): All the general features available to a Temporal Application.

  - [Signals](/dev-guide/java/features#signals)
  - [Queries](/dev-guide/java/features#queries)
  - [Workflow timeouts and retries](/dev-guide/java/features#workflow-timeouts)
  - [Activity timeouts and retries](/dev-guide/java/features#activity-timeouts)
  - [Activity Heartbeats](/dev-guide/java/features#activity-heartbeats)
  - [Async Activity Completion](/dev-guide/java/features#asynchronous-activity-completion)
  - [Child Workflows](/dev-guide/java/features#child-workflows)
  - [Continue-As-New](/dev-guide/java/features#continue-as-new)
  - [Cron Jobs](/dev-guide/java/features#temporal-cron-jobs)

- [**Observability**](/dev-guide/java/observability): Methods for observing a Temporal Application.

  - [Metrics](/dev-guide/java/observability#metrics)
  - [Tracing](/dev-guide/java/observability#tracing)
  - [Logging](/dev-guide/java/observability#logging)
  - [Visibility](/dev-guide/java/observability#visibility)

- [**Worker performance**](/dev-guide/worker-performance)

  - [Metrics](/dev-guide/worker-performance#metrics)
  - [Configuration](/dev-guide/worker-performance#configuration)
  - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
  - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
  - [Invariants](/dev-guide/worker-performance#invariants)
  - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
