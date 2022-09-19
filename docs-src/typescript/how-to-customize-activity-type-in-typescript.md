---
id: how-to-customize-activity-type-in-typescript
title: How to customize Activity Type in TypeScript
sidebar_label: Customize Activity Type
description: Customize Activity Type
tags:
  - developer-guide
  - typescript
---

In TypeScript, the Activity Type is the property of the [`WorkerOptions.activities`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#activities) object.
Usually, that's the Activity function's name.
For example, in the following code, the Activity Type is `greet`:

<!--SNIPSTART typescript-activity-fn -->
<!--SNIPEND-->

<!--SNIPSTART typescript-worker-create -->
<!--SNIPEND-->

You can customize the Activity Type by choosing a property other than the function name. In the following example, the Activity Type is `activityFoo`:

<!--SNIPSTART typescript-custom-activity-type -->
<!--SNIPEND-->
