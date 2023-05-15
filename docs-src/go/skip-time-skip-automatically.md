---
id: skip-time-skip-automatically
title: Skip time automatically
description: The test server included in most SDKs is an in-memory implementation of Temporal Server that supports skipping time.
sidebar_label: Automatic method
tags:
  - guide-context
---

You can skip time automatically in the SDK of your choice.
Start a test server process that skips time as needed.
For example, in the time-skipping mode, Timers, which include sleeps and conditional timeouts, are fast-forwarded except when Activities are running.
