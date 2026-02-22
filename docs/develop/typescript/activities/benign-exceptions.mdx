---
id: benign-exceptions
title: Benign exceptions - TypeScript SDK
sidebar_label: Benign exceptions
description: Mark expected or non-severe Activity errors as benign to reduce noise in logs, metrics, and OpenTelemetry traces.
toc_max_heading_level: 2
keywords:
  - benign exceptions
  - application failure
  - error handling
  - observability
  - typescript
tags:
  - Activities
  - Errors
  - Failures
  - TypeScript SDK
  - Temporal SDKs
---

**How to mark an Activity error as benign using the Temporal TypeScript SDK**

When Activities throw errors that are expected or not severe, they can create noise in your logs, metrics, and OpenTelemetry traces, making it harder to identify real issues.
By marking these errors as benign, you can exclude them from your observability data while still handling them in your Workflow logic.

To mark an error as benign, set the `category` field to `ApplicationFailureCategory.BENIGN` when creating an [`ApplicationFailure`](https://typescript.temporal.io/api/classes/common.ApplicationFailure).

Benign errors:
- Have Activity failure logs downgraded to DEBUG level
- Do not emit Activity failure metrics
- Do not set the OpenTelemetry failure status to ERROR

```typescript
import {
  ApplicationFailure,
  ApplicationFailureCategory,
} from '@temporalio/common';

export async function myActivity(): Promise<string> {
  try {
    return await callExternalService();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw ApplicationFailure.create({
      message,
      // Mark this error as benign since it's expected
      category: ApplicationFailureCategory.BENIGN,
    });
  }
}
```

Use benign exceptions for Activity errors that occur regularly as part of normal operations, such as polling an external service that isn't ready yet, or handling expected transient failures that will be retried.
