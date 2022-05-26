---
tags:
  - Temporal
  - Workers
  - Production
  - Podcast
posted_on_: 2022-01-21T00:00:09Z
slug: workers-in-production
title: Productionizing Workers
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.14.3
---

> Update: See also our new docs on [SDK metrics](https://docs.temporal.io/references/sdk-metrics/) and [Temporal Workers Tuning](https://docs.temporal.io/operation/how-to-tune-workers/) for detailed instructions.

Whether you are self hosting Temporal Server or using Temporal Cloud, a key part of the operational model of Temporal is running your own Workers. We recently hosted a chat with Temporal CTO Samar Abbas on the 4 main areas to note when productionizing your Temporal Workers:

<!--truncate-->

- Operational Metrics - Monitoring and Alerting
- Incident Response & Tooling
- Upgrading and Versioning
- Testing Failure Paths

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=bKRIkbxrVjs' />

## Operational Health Metrics - Monitoring and Alerting (02:30)

The great thing about Temporal is that you can develop against it locally without constraints (and it is getting even faster with [temporalite](https://github.com/DataDog/temporalite)). But when it comes to running your Temporal applicaiton in production, you are now dealing with a distributed system.

**In other words: How will you know if your Temporal application is doing its job or is even running as expected?**

Temporal emits a lot of metrics, both client and server, which gives insights into how your application is performing: counters, latency, and metrics for server health and for each namespace. Temporal uses the [Tally library from Uber](https://github.com/uber-go/tally) to emit properly buffered metrics with nice reporting integration with m3, Prometheus, Statsd, and [Datadog via custom reporters](https://docs.temporal.io/server/options/#withcustommetricsreporter), and provides [dashboards for Grafana users](https://github.com/temporalio/dashboards) to display them. We also recently co-presented about [Temporal and M3 with Chronosphere at KubeCon NA 2021](https://www.youtube.com/watch?v=8OCDPDGA_C0).

- **Activity Worker Health**
    - How many activities are getting started?
    - How many activities are completing successfully?
    - Which activities are failing?
    - **Set alerts for Activity failure rate**
- **Workflow Worker Health**
    - What rate are your Workflow Tasks happening at?
    - Are your Workflow Tasks completing successfully?
    - What is your Workflow Task latency?
    - **Set alerts for Workflow Task failure rate**
- **Scaling**
    - **Set alerts on [Activity Schedule to Start latency and Workflow Schedule to Start latency](https://docs.temporal.io/server/production-deployment/#scaling-and-metrics)** and scale your Workers based on that

Our full reference on [SDK/Worker metrics is here](https://docs.temporal.io/references/sdk-metrics/).

When you have ingested all these metrics and have set up a dashboard to give you visibility, at least now you can start getting a n overall picture of what’s going on with the system.

## Incident Reponse & Tooling (10:06)

When Workflow Task Failure rates spike, you are now in incident response mode. There can be many possible causes, so the first thing an operator needs to do is to figure out whether the failure is from your application or Temporal Server. 

- **Metrics**. The first metric to look at is the “service request” and “service error” metrics emitted by the Server. If you are seeing workflow tasks or activities failing, it is a strong indication that you should focus on the application side rather than Temporal Server.
- **Logs**. The best tool for investigating application side failures is your logs - make sure your logs are stored and captured by your workers, and tagged with important structured data like workflow type, activity type, workflow ID, and run ID. Try to put as much information as tags to allow you to slice and dice logs on arbitrary criteria.
- **Execution History**. You should be able to tell whether your failures are coming from one particular workflow type, and to be able to isolate a specific workflow/run ID to investigate. You can then use **Temporal Web or Temporal CLI (tctl)** to look at the state and execution history of that workflow, which will reveal more datapoints on how to debug. In the history view, you should be able to see the entire call stack of the failure as well.
- **Replay**. You can also **replay the Workflow** to investigate it, by downloading the execution history via the Web or CLI tool, and stepping through the code using a debugger on your local machine.

## Upgrading and Versioning (17:59)

How do you migrate long running workflows that are still in flight? Most developers who hand roll their own job scheduling and orchestration frameworks don’t have anything better than “deploy and pray”, but Temporal offers a first class solution.

Temporal requires that your Workflows must be fully deterministic, and changing Workflow code means potentially breaking determinism. This is where the `getVersion` API is handy because it allows you to make changes in Workflow logic in a deterministic fashion.

Temporal offers a `getVersion` API in the [Go](https://docs.temporal.io/go/versioning/#workflowgetversion), [Java](https://docs.temporal.io/java/versioning/#java-versioning-api), [PHP](https://docs.temporal.io/php/versioning/#workflowgetversion) SDKs, and a [Patching](https://docs.temporal.io/typescript/patching) API in TypeScript, that essentially amounts to feature flagging by start time cohort:

```go
v := workflow.GetVersion(ctx, "Step1", 1, 2)
if v == 1 {
        err = workflow.ExecuteActivity(ctx, ActivityC, data).Get(ctx, &result1)
} else {
        err = workflow.ExecuteActivity(ctx, ActivityD, data).Get(ctx, &result1)
}
```

We have also published a **[30 min tutorial on versioning](https://www.youtube.com/watch?v=kkP899WxgzY&feature=emb_title)** to guide you through this API.

- **How it works**: Temporal internally tracks the version of Workflow code at the time that particular Workflow Execution was started, and uses that to navigate code paths based on these user defined branches. New Workflow Executions take the latest paths by default.
- **Sample and Replay:** While this is an elegant and powerful API (because it can be used and composed in arbitrary logic), it still needs to be handled carefully. This is why replaying workflow execution is so important. Before migration, take samples of Workflow histories at different stages, and use the replay API.
- **Use Task Queues for Short-Lived Workflows**: Think through your upgrade strategy - you may not even need versioning if your workflows are short-lived enough! If you just want to cut over to new code, you can run old code on the same Task Queue with a subset of Workers, and run new code on a different set of Workers with a new Task Queue!
- **Worst Case**: When in doubt - take a breath - because of Temporal’s event sourced nature, if a migration is screwed up, **our worst case is that your Workflows don’t make progress** - latency will spike, but data will not be lost - just make sure you are fully familiar with metrics and logs to investigate issues!

## Testing Failure Paths (24:38)

Most people (including us) primarily code for happy paths when thinking about business logic. However there are some unhappy paths that are persistently overlooked:

- **Backlogs**: A backlog happens when multiple Workflow tasks (mainly Timers) resolve together when some part of your system (say your Workers, or even the Server) is down. When Temporal recovers, it will still fire those timers, but it is not guaranteed to fire them in chronological order. However, happy-path code will typically assume that they do. **Always** test your system for backlogs.
    - Specifically, when you write end-to-end tests for your production Temporal system, make sure to write some that **shuts down your Workers** for some time to create backlog of Workflow tasks, and then spin them up again to churn through the backlog. You can do it [programmatically within an SDK Worker API](https://docs.temporal.io/typescript/workers#how-to-shut-down-a-worker-and-track-its-state) or externally through your infra automation tool of choice.
- **Capacity Planning**: End to end tests that include Worker outages not only help find edge cases like backlogs. When the system has a backlog, the system’s resource consumption is very different than under normal circumstances. Always do capacity planning accounting for cases where the system is going through heavy load due to backlog or spikes.
    - Note: we have also written about [how we do stress testing](https://docs.temporal.io/blog/temporal-deep-dive-stress-testing/) and [Maru is a third party load testing tool](https://mikhail.io/2021/03/maru-load-testing-tool-for-temporal-workflows/).
- **Timeouts**: Temporal provides [4 kinds of Activity timeouts](https://docs.temporal.io/blog/activity-timeouts/) (we don’t recommend using Workflow timeouts) and a declarative [Retry Policy](https://docs.temporal.io/concepts/activities/#retries) which are very flexible, which is powerful but can be a source of mistakes. We recommend explicitly unit- and integration-testing for these timeouts - don’t assume that the code you have written will behave as you intended.


Did this discussion help with your production concerns? What other questions to you wish to ask? Email [swyx@temporal.io](mailto:swyx@temporal.io) to request the next topic!
