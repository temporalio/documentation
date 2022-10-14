---
id: namespaces
title: How to create and manage Namespaces
sidebar_label: Namespaces
description: A Namespace is a unit of isolation within the Temporal Platform.
tags:
  - guide-context
---

A [Namespace](/concepts/what-is-a-namespace) is a unit of isolation within the Temporal Platform.

Namespaces are created on the Temporal Cluster, and provide a range of controls to achieve isolation on Workflow Executions.

You must [register a Namespace](/app-dev-context/register-namespaces) with the Temporal Cluster before setting it in the Temporal Client.
Once registered, you can get details for your Namespaces, update Namespace configuration, and deprecate or delete your Namespaces.
