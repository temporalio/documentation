---
id: introduction
title: PHP SDK introduction
sidebar_label: PHP SDK introduction
---

## Quick start

1. Clone the [Temporal PHP SDK](https://github.com/temporalio/sdk-php) or add it as dependency to your project using a dependency management tool like composer:

```composer
"require": {
    "temporal/sdk": ">=1.0",
  },
```

2. [Install and run the Temporal Server](/clusters/quick-install) using `docker compose`.

## Tutorials

- You should orient yourself to the Hello World with [the PHP Hello World Walkthrough](/php/hello-world).
- For those interested in distributed transactions, see the [Booking Saga Tutorial and code sample](/php/booking-saga-tutorial).
- For a more non-trivial discussion of an application, see [the Subscription Tutorial](/php/subscription-tutorial) or [browse the code directly](https://github.com/temporalio/subscription-workflow-project-template-php).

Much more detailed API samples can be viewed in [the Samples Repo](/samples-library/#php).

## Resources

- Join the `#php-sdk` channel on the [Temporal Slack](https://temporal.io/slack) or [open issues on GitHub](https://github.com/temporalio/sdk-php/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
- PHP SDK samples
  - [Beginner-advanced library](https://github.com/temporalio/samples-php#samples)
  - [Subscription Workflow sample](https://github.com/temporalio/subscription-workflow-project-template-php)
- Talks
  - 🆕 PHPConf 2021: [Fault tolerant workflow orchestration on PHP](https://www.youtube.com/watch?v=pdxHkIqX62A)
  - PHPConf 2020: [Designing hybrid Go/PHP applications using RoadRunner](https://www.youtube.com/watch?v=mj6d-IGzSYE)
  - (Slides) [Distributed Workflows on PHP](https://docs.google.com/presentation/d/1NBZlnJFCc-PgYxQk0_YYxUTmfKgzUf6Z-XHXfPETLac/edit?usp=sharing)
  - (Russian) [Orchestrate it! Complex business processes in PHP](https://www.youtube.com/watch?v=upL8o-OXYEc) (2 hour workshop)
  - (Russian) [Orchestration and Murphy's Law: Handling Errors-Business Processes](https://www.youtube.com/watch?v=0NCMEaFMj_M) (2 hour workshop)
  - (Russian) PHP Russia https://phprussia.ru/moscow/2021/abstracts/7390 (video pending)
  - (Russian) [FWDays Keynote: Fault Tolerant Workflow Orchestration on PHP](https://fwdays.com/en/event/php-fwdays-2021/review/fault-tolerant-workflow-orchestration-on-php) (video pending)
- The PHP SDK is often used with [Roadrunner](https://roadrunner.dev/) (maintained by [SpiralScout](https://github.com/spiral?type=source), the maintainers of the PHP SDK)

## The basics

- [Workflows](/php/workflows)

- [Activities](/php/activities)

- [Workers](/php/workers)

- [Task Queues](/php/task-queues)

- [Signals](/php/signals)

- [Queries](/php/queries)
