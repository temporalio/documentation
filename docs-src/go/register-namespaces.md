---
id: register-namespaces
title: How to register Namespaces
sidebar_label: Register Namespace
description: On Temporal Cloud, use the Temporal Cloud UI or tcld commands, and on self-hosted Temporal Cluster, use `tctl namespace register` or `RegisterNamespaceRequest` API to create Namespaces.
tags:
  - guide-context
---

Registering a Namespace creates a Namespace on the Temporal Cluster or Temporal Cloud.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud-context/namespaces-create) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to create Namespaces.

On self-hosted Temporal Cluster, you can register your Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create, update, or deprecate Namespaces.
