---
id: auto-restart-worker-tip
title: Automatically restart Worker Process during development
description: Developer tip, is to use the gow package to automatically restart the Worker Process.
sidebar_label: Auto restart Worker
tags:
  - worker
  - go
---

:::info Auto restart worker when code changes

Use [`gow`](https://github.com/mitranim/gow) to automatically restart the Worker Process whenever any of the Go code files in your project change.

```shell
go install github.com/mitranim/gow@latest
gow worker/main.go # automatically restarts when the project files change
```

:::
