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
The following language is selected:

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

The application development guide is broken down into four sections:

1. [**Foundations**](/application-development/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/application-development/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/application-development/foundations#add-your-sdk)
   - [Develop a basic Workflow Definition](/application-development/foundations#develop-workflow)
   - [Develop a basic Activity Definition](/application-development/foundations#develop-activities)
   - [Call to execute an Activity](/application-development/foundations#start-activity-execution)
   - [Create Temporal Clients](/application-development/foundations#create-temporal-clients)
   - [Run a Worker Process](/application-development/foundations#run-worker-processes)
   - [Start a Workflow Execution](/application-development/foundations#start-workflow-execution)

2. [**Features**](/application-development/features): All the general features available to a Temporal Application.

   - [Signals](/application-development/features#signals)
   - [Queries](/application-development/features#queries)
   - [Workflow timeouts & retries](/application-development/features#workflow-timeouts--retries)
   - [Activity timeouts & retries](/application-development/features#activity-timeouts--retries)
   - [Activity Heartbeats](/application-development/features#activity-heartbeats)
   - [Async Activity Completion](/application-development/features#async-activity-completion)
   - [Child Workflows](/application-development/features#child-workflows)
   - [Continue-As-New](/application-development/features#continue-as-new)
   - [Cron Jobs](/application-development/features#cron-jobs)

3. [**Observability**](/application-development/observability): Methods for observing a Temporal Application.

   - [Metrics](/application-development/observability#metrics)
   - [Tracing](/application-development/observability#tracing)
   - [Logging](/application-development/observability#logging)
   - [Visibility](/application-development/observability#visibility)

4. [**Worker performance**](/application-development/worker-performance)

   - [Metrics](/application-development/worker-performance#metrics)
   - [Configuration](/application-development/worker-performance#configuration)
   - [Task Queue processing tuning](/application-development/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/application-development/worker-performance#workflow-cache-tuning)
   - [Invariants](/application-development/worker-performance#invariants)
   - [Large value drawbacks](/application-development/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
