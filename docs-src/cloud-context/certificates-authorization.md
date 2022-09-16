---
id: certificates-authorization
title: How to control authorization for Temporal Cloud Namespaces
sidebar_label: Control authorization
description: Temporal Cloud requires full CA chains, so you can achieve authorization in two ways.
tags:
  - guide-context
---

Because Temporal Cloud uses mTLS for authorization, we recommend that an end-entity certificate be scoped to a specific Namespace.
Temporal Cloud requires full CA chains, so you can achieve authorization in two ways.

### Option 1: Issue a separate root certificate for each Namespace

Each certificate must belong to a chain up to the root CA certificate.
Temporal uses the root CA certificate as the trusted authority for access to your Namespaces.

1. Ensure that your certificates meet the [certificate requirements](#certificate-requirements).
1. [Add client CA certificates to a Cloud Namespace](/cloud/tcld/namespace/accepted-client-ca/add).

### Option 2: Use the same root certificate for all Namespaces but create a separate certificate filter for each Namespace

[How to manage certificate filters in Temporal Cloud](#manage-certificate-filters)
