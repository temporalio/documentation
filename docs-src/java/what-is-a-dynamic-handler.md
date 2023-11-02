---
id: what-is-a-dynamic-handler
title: What is a Dynamic Handler?
sidebar_label: Dynamic Handler
description: Dynamic Handlers are Workflows, Activities, Signals, or Queries that are unnamed and invoked when no other named handler matches the call from the Server at runtime.
tags:
  - term
  - explanation
---

Temporal supports Dynamic Workflows, Activities, Signals, and Queries.
These are unnamed handlers that are invoked if no other statically defined handler with the given name exists.

Dynamic Handlers provide flexibility to handle cases where the names of Workflows, Activities, Signals, or Queries aren't known at run time.

:::caution

Dynamic Handlers should be used judiciously as a fallback mechanism rather than the primary approach.
Overusing them can lead to maintainability and debugging issues down the line.

Instead, Workflows, Activities, Signals, and Queries should be defined statically whenever possible, with clear names that indicate their purpose.
Use static definitions as the primary way of structuring your Workflows.

Reserve Dynamic Handlers for cases where the handler names are not known at compile time and need to be looked up dynamically at runtime.
They are meant to handle edge cases and act as a catch-all, not as the main way of invoking logic.

:::
