---
id: auto-restart-worker-tip
title: Automatically restart Worker Process during development
description: Developer tip - Use the nodemon package to automatically restart the Worker Process.
sidebar_label: Auto restart Worker
tags:
  - worker
  - typescript sdk
---

:::info Auto restart Worker when code changes

Use [`nodemon`](https://www.npmjs.com/package/nodemon) to automatically restart the Worker Process whenever any of the code files in your project change. This is automatically configured for your projects when you use the `@temporalio/create` command to build your project.

```shell
npm run start.watch
```

:::
