---
id: manage-namespaces
title: How to manage Namespaces
sidebar_label: Manage Namespaces
description: You can get details for your Namespaces, update Namespace configuration, and deprecate or delete your Namespaces.
tags:
  - guide-context
---

You can get details for your Namespaces, update Namespace configuration, and deprecate or delete your Namespaces.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud-context/namespaces-create) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to manage Namespaces.

On self-hosted Temporal Cluster, you can manage your registered Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create, update, or deprecate Namespaces.

You must register a Namespace with the Temporal Cluster before setting it in the Temporal Client.
