---
id: how-to-mock-activities-in-typescript
title: How to mock Activities in TypeScript
sidebar_label: Mock Activities
description: Mock Activities
tags:
  - developer-guide
  - sdk
  - typescript
---

Implement only the relevant Activities for the Workflow being tested.

```ts
import type * as activities from './activities';

// Creating a mock object of the activities.
const mockActivities: Partial<typeof activities> = {
  makeHTTPRequest: async () => '99',
};

// Creating a worker with the mocked activities.
const worker = await Worker.create({
  activities: mockActivities,
  // ...
});
```
