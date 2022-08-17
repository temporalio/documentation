---
id: how-to-manage-namespaces-in-temporal-cloud
title: How to manage Namespaces in Temporal Cloud
sidebar_label: Manage Namespaces
description: Use Namespace endpoints for access; use tcld to obtain Namespace information.
tags:
  - how-to
---

To create a [Namespace](/namespaces) in Temporal Cloud, see the following topics:

- [Create a Namespace using Temporal Web UI](/cloud/how-to-create-a-namespace-in-temporal-cloud#create-a-namespace-using-temporal-web-ui)
- [Create a Namespace using tcld](/cloud/how-to-create-a-namespace-in-temporal-cloud#create-a-namespace-using-tcld)

<!--- How to access a Namespace in Temporal Cloud --->

## Access a Namespace in Temporal Cloud

Each Namespace in Temporal Cloud has two unique endpoints, both of which include the [Namespace Id](/cloud/#cloud-namespace-id).

- For programmatic access, a gRPC endpoint in the form `<NamespaceId>.tmprl.cloud`; for example, `accounting-production.f45a2.tmprl.cloud:7233`.
- For accessing Temporal Web UI, an HTTPS endpoint in the form `web.<namespaceId>.tmprl.cloud`; for example, `https://web.accounting-production.f45a2.tmprl.cloud`.

<!--- How to manage Namespaces in Temporal Cloud using Temporal Web UI --->

## Manage Namespaces in Temporal Cloud using Web UI

This functionality is in development.

<!--- How to manage Namespaces in Temporal Cloud using tcld --->

## Manage Namespaces in Temporal Cloud using tcld

To list Namespaces and get information about them, use the following [tcld](/cloud/tcld/) commands:

- [tcld namespace list](/cloud/tcld/namespace/list)
- [tcld namespace get](/cloud/tcld/namespace/get)

To manage certificates, use the [tcld namespace accepted-client-ca](/cloud/tcld/namespace/accepted-client-ca/) commands.
For more information, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud).

To manage certificate filters, use the [tcld namespace certificate-filters](/cloud/tcld/namespace/certificate-filters/) commands.
For more information, see [How to manage certificate filters in Temporal Cloud](/cloud/how-to-manage-certificate-filters-in-temporal-cloud).
