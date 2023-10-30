---
id: rps
title: temporal rps
sidebar_label: rps
description: Requests per second (RPS), limits the number of operations processed per second within a batch.
tags:
    - cli reference
    - temporal cli
    - options-feature
    - command-line-interface-cli
    - workflow execution
    - requests per second
---

Requests per second (RPS), limits the number of operations processed per second within a batch.

This limit defines the number of operations the batch can process every second.
It's designed to ease system strain from batch operations, ensuring the system doesn’t get overloaded.
This in turn helps maintain prompt execution of ongoing tasks for user Workers.

If you specify a limit that surpasses the server's set limit, the system will defer to the server's limit.

If you don't set an explicit limit, or if your specified limit surpasses the server's set limit, the server will follow the [limit set by the dynamic configuration key `worker.batcherRPS`](/references/dynamic-configuration#service-level-rps-limits).
