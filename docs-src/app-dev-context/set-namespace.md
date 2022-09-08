---
id: set-namespace
title: How to set a Namespace
description: Namespaces are a logical unit of isolation within the Temporal Platform
sidebar_label: Set Namespace
tags:
  - guide-context
---

[Namespaces](/concepts/what-is-a-namespace) are a logical unit of isolation within the Temporal Platform.

To set a custom Namespace, register your custom Namespace with the Temporal Cluster first, and then set it in the Temporal Client with the Client Options.

To register a Namespace, use `tctl --namespace your-custom-namespace namespace register`.

For more information, see [tctl namespace reference](/tctl/namespace/register).
