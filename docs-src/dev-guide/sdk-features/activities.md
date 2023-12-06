---
id: activities
title: Activities
sidebar_label: Activities
description: this code is a function or method that defines a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email message.
tags:
  - temporal sdks
---

Often referred to as an Activity Definition, this code is a function or method that defines a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email message.

<LanguageLinks>
- Go SDK
- [Feature guide](/go/generated/how-to-develop-an-activity-definition-in-go)
- [Project setup chapter](/go/generated/backgroundcheck-boilerplate-ssntrace-activity)
- Java SDK
- [Feature guide](/java/developing-activities)
- [Project setup chapter](/java/chapter-project-setup/backgroundcheck-boilerplate-activity-definition)
- PHP SDK
- [Feature guide](/php/developing-activities)
- Python SDK
- [Feature guide](/python/developing-activities)
- [Project setup chapter](/python/backgroundcheck-boilerplate-ssntrace-activity)
- TypeScript SDK
- [Feature guide](/typescript/developing-activities)
</LanguageLinks>

Activity code can be non-deterministic.
However, We recommend that Activities be [idempotent](/concepts/what-is-an-activity#idempotency).

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (Exception when [Heartbeatig](/dev-guide/sdk-features/activity-heartbeats)).

Learn more about Temporal Activities in the [conceptual deep dive](/concepts/what-is-an-activity).
