---
id: go-dev-guide-structure
title: Go SDK developer's guide structure
description: Explore the Temporal Go SDK's developer's guide structure.
sidebar_label: Go SDK guide
tags:
  - dev guide
  - go
---

:::info Temporal Go SDK API reference

https://pkg.go.dev/go.temporal.io/sdk

:::

The follow structure applies to the Temporal Go SDK developer's guide:

- [**Introduction to the Temporal Go SDK**](/go/introduction-to-go-sdk)

  - [Supported runtimes](/go/introduction-to-go-sdk#supported-runtimes)
  - [Add to project](/go/introduction-to-go-sdk#add-to-project)
  - [Expected skills and experiences](/go/introduction-to-go-sdk#expected-skills-and-experiences)
  - [Additional resources for learning the Go SDK](/go/introduction-to-go-sdk#additional-resources)
  - [Contribution](/go/introduction-to-go-sdk#contribution)

- [**Project setup**](/go/go-dev-guide-structure)
  - [How to download and install the Temporal CLI](/go/install-cli)
  - [Which development Cluster you should choose](/go/choose-dev-cluster)
  - How to create a new Namespace in your development Cluster
    - [Local dev server](/go/choose-dev-cluster#local-dev-server)
    - [Temporal Cloud](/go/choose-dev-cluster#temporal-cloud)
    - [Self-hosted Temporal Cluster](/go/choose-dev-cluster#self-hosted-temporal-cluster)
  - [Boilerplate application code and file structure best practices](/go/project-structure)
  - How to run your Worker
    - [Local dev server Worker](/go/backgroundcheck-boilerplate-run-a-dev-server-worker)
    - [Temporal Cloud Worker](/go/backgroundcheck-boilerplate-cloud-worker)
    - [Self-hosted Worker](/go/self-hosted-worker-docker-network)
  - How to start your Workflow using the CLI
    - [Start on local dev server](/go/backgroundcheck-boilerplate-start-workflow#local-dev-server)
    - [Start on Temporal Cloud](/go/backgroundcheck-boilerplate-start-workflow#temporal-cloud)
    - [Start on Self-hosted](/go/backgroundcheck-boilerplate-start-workflow#self-hosted)
  - [How to add a testing framework and tests to your application](/go/backgroundcheck-boilerplate-add-test-framework)

2. [**Foundations**](/go/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/go/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/go/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/go/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/go/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/go/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/go/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/go/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/go/foundations#start-workflow-execution)

3. [**Features**](/dev-guide/go/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/go/features#signals)
   - [Queries](/dev-guide/go/features#queries)
   - [Workflow timeouts and retries](/dev-guide/go/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/go/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/go/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/go/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/go/features#child-workflows)
   - [Continue-As-New](/dev-guide/go/features#continue-as-new)
   - [Schedules](/dev-guide/go/features#schedule-a-workflow)
   - [Cron Jobs](/dev-guide/go/features#temporal-cron-jobs)
   - [Updates](/dev-guide/go/features#updates)

4. [**Observability**](/dev-guide/go/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/go/observability#metrics)
   - [Tracing](/dev-guide/go/observability#tracing)
   - [Logging](/dev-guide/go/observability#logging)
   - [Visibility](/dev-guide/go/observability#visibility)

5. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
