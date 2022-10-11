---
id: index
title: Temporal Application developer's guide
description: The Temporal Application developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Developer guide
---

:::info WORK IN PROGRESS

This guide is a work in progress.
Some sections may be incomplete or missing for some languages.
Information may change at any time.

If you can't find what you are looking for in the Application development guide, it could be in [older docs for SDKs](/sdks).

:::

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Supported SDKs

The following [language SDKs](/temporal#temporal-sdk) are supported.
Language tab selection is preserved through a browser cookie.
The following language is selected:

<Tabs
defaultValue="go"
groupId="site-lang"
values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'},{label: 'PHP', value: 'php'},{label: 'Python', value: 'python'},{label: 'TypeScript', value: 'typescript'},]}>

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
<TabItem value="python">

Python is currently selected!

<div class="app-dev-landing-page-lang-logo">
<img src="/app-dev/python.svg" alt="python logo" />
</div>

</TabItem>
<TabItem value="typescript">

TypeScript / JavaScript is currently selected!

<div class="app-dev-landing-page-lang-logos">
<img src="/app-dev/typescript.svg" alt="TypeScript logo" />
<img src="/img/javascript.svg" alt="JavaScript logo" />
</div>

</TabItem>
</Tabs>

## Guide structure

The application development guide is broken down into four sections:

1. [**Foundations**](/dev-guide/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/foundations#add-your-sdk)
   - [How to create a Temporal Client](/dev-guide/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/features#signals)
   - [Queries](/dev-guide/features#queries)
   - [Workflow timeouts & retries](/dev-guide/features#workflow-timeouts)
   - [Activity timeouts & retries](/dev-guide/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/features#child-workflows)
   - [Continue-As-New](/dev-guide/features#continue-as-new)
   - [Cron Jobs](/dev-guide/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/observability#metrics)
   - [Tracing](/dev-guide/observability#tracing)
   - [Logging](/dev-guide/observability#logging)
   - [Visibility](/dev-guide/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
