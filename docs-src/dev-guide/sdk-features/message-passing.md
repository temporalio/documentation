---
id: message-passing
title: Message passing features
sidebar_label: Message passing
description: TODO
tags:
  - determinism
  - runtime safeguards
---

Message passing enables communication between a Workflow Execution and a Temporal Client.
This capability enables interaction with an open Workflow from various locations, as a Temporal Client can be embedded within Activities or integrated into other systems.

There are three main message passing features:

- [Signals](/dev-guide/sdk-features/signals): Think of as an asynchronous "write-only" style of messages.
- [Queries](/dev-guide/sdk-features/queries): Think of a as a synchronous "read-only" style of messages.
- [Updates](/dev-guide/sdk-features/updates): Think of a as a synchronous "write/read" style of messages.
