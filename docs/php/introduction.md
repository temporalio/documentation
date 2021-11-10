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

2. [Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.

## Resources

- Join the `#php-sdk` channel on the [Temporal Slack](https://temporal.io/slack) or [open issues on GitHub](https://github.com/temporalio/sdk-php/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
- [PHP SDK samples library](/docs/samples-library/#php)
- Talks
  - 🆕 PHPConf 2021: [Fault tolerant workflow orchestration on PHP](https://www.youtube.com/watch?v=pdxHkIqX62A)
  - PHPConf 2020: [Designing hybrid Go/PHP applications using RoadRunner](https://www.youtube.com/watch?v=mj6d-IGzSYE)
  - (Slides) [Distributed Workflows on PHP](https://docs.google.com/presentation/d/1NBZlnJFCc-PgYxQk0_YYxUTmfKgzUf6Z-XHXfPETLac/edit?usp=sharing)
  - (Russian) [Orchestrate it! Complex business processes in PHP](https://www.youtube.com/watch?v=upL8o-OXYEc) (2 hour workshop)
  - (Russian) [Orchestration and Murphy's Law: Handling Errors-Business Processes](https://www.youtube.com/watch?v=0NCMEaFMj_M) (2 hour workshop)
  - (Russian) PHP Russia https://phprussia.ru/moscow/2021/abstracts/7390 (video pending)
  - (Russian) [FWDays Keynote: Fault Tolerant Workflow Orchestration on PHP](https://fwdays.com/en/event/php-fwdays-2021/review/fault-tolerant-workflow-orchestration-on-php) (video pending)
- The PHP SDK is often used with [Roadrunner](https://roadrunner.dev/) (also maintained by SpiralScout)

## The basics

- [Workflows](/docs/php/workflows)

- [Activities](/docs/php/activities)

- [Workers](/docs/php/workers)

- [Task Queues](/docs/php/task-queues)

- [Signals](/docs/php/signals)

- [Queries](/docs/php/queries)
