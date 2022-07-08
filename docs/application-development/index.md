---
id: index
title: Temporal Application development guide
sidebar_label: Application development
---

:::info WORK IN PROGRESS

This guide is a work in progress.
Some sections may be incomplete or missing for some languages.
Information may change at any time.

:::

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/concepts/what-is-a-temporal-application) development.

## Supported SDKs

The following language SDKs are supported.
Language tab selection is preserved through a browser cookie.
You are currently have the following language selected:

<Tabs
defaultValue="go"
groupId="site-lang"
values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'},{label: 'PHP', value: 'php'},{label: 'TypeScript', value: 'typescript'},]}>

<TabItem value="go">

Go is currently selected!

<div class="app-dev-landing-page-lang-logo">
<img src="/app-dev/go-lang.svg" alt="Go lang logo" />
</div>

</TabItem>
<TabItem value="java">

Java is currently selected!

<div class="app-dev-landing-page-lang-logo">
<img src="/app-dev/java.svg" alt="Java logo" />
</div>

</TabItem>
<TabItem value="php">

PHP is currently selected!

<div class="app-dev-landing-page-lang-logo">
<img src="/app-dev/php.svg" alt="PHP logo" />
</div>

</TabItem>
<TabItem value="typescript">

Typescript is currently selected!

<div class="app-dev-landing-page-lang-logo">
<img src="/app-dev/typescript.svg" alt="TypeScript logo" />
</div>

</TabItem>
</Tabs>

### SDKs in development

The following SDKs are in alpha/pre-alpha development stages, but are not yet supported in the application development guide:

- [.NET](https://github.com/temporalio/sdk-dotnet)
- [Rust](https://github.com/temporalio/sdk-core)
- [Ruby](https://github.com/temporalio/sdk-ruby)

### Third-party SDKs

The following third party SDKs exist, but are not supported in the application development guide:

- [coinbase/temporal-ruby](https://github.com/coinbase/temporal-ruby)

## Guide structure

The applicationd development guide is broken down into four sections:

1. [**Foundations**](/next/application-development/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/next/application-development/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/next/application-development/foundations#add-your-sdk)
   - [Develop a basic Workflow Definition](/next/application-development/foundations#develop-workflow)
   - [Develop a basic Activity Definition](/next/application-development/foundations#develop-activities)
   - [Call to execute an Activity](/next/application-development/foundations#start-activity-execution)
   - [Create Temporal Clients](/next/application-development/foundations#create-temporal-clients)
   - [Run a Worker Process](/next/application-development/foundations#run-worker-processes)
   - [Start a Workflow Execution](/next/application-development/foundations#start-workflow-execution)

2. [**Features**](/next/application-development/features): All the general features available to a Temporal Application.

   - [Signals](/next/application-development/features#signals)
   - [Queries](/next/application-development/features#queries)
   - [Workflow timeouts & retries](/next/application-development/features#workflow-timeouts--retries)
   - [Activity timeouts & retries](/next/application-development/features#activity-timeouts--retries)
   - [Activity Heartbeats](/next/application-development/features#activity-heartbeats)
   - [Async Activity Completion](/next/application-development/features#async-activity-completion)
   - [Child Workflows](/next/application-development/features#child-workflows)
   - [Continue-As-New](/next/application-development/features#continue-as-new)
   - [Cron Jobs](/next/application-development/features#cron-jobs)

3. [**Observability**](/next/application-development/observability): Methods for observing a Temporal Application.

   - [Metrics](/next/application-development/observability#metrics)
   - [Tracing](/next/application-development/observability#tracing)
   - [Logging](/next/application-development/observability#logging)
   - [Visibility](/next/application-development/observability#visibility)

4. [**Worker performance**](/next/application-development/worker-performance)

   - [Metrics](/next/application-development/worker-performance#metrics)
   - [Configuration](/next/application-development/worker-performance#configuration)
   - [Task Queue processing tuning](/next/application-development/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/next/application-development/worker-performance#workflow-cache-tuning)
   - [Invariants](/next/application-development/worker-performance#invariants)
   - [Large value drawbacks](/next/application-development/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
