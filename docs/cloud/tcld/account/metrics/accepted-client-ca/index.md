---
id: index
title: tcld account metrics accepted-client-ca
description: How to managed the end-entity certificates for the metrics endpoint of a Temporal Cloud account using tcld.
tags:
  - reference
  - tcld
---

The `tcld account metrics accepted-client-ca` commands manage the end-entity certificates for the metrics endpoint of the Temporal Cloud account that is currently logged in.

:::info

The end-entity certificates for the metrics endpoint must chain up to the CA certificate used for the account. For more information, see [Certificate requirements](/cloud/how-to-manage-certificates-in-temporal-cloud#certificate-requirements).

:::

Alias: `ca`

- [`tcld account metrics accepted-client-ca add`](/cloud/tcld/account/metrics/accepted-client-ca/add)
- [`tcld account metrics accepted-client-ca list`](/cloud/tcld/account/metrics/accepted-client-ca/list)
- [`tcld account metrics accepted-client-ca set`](/cloud/tcld/account/metrics/accepted-client-ca/set)
- [`tcld account metrics accepted-client-ca remove`](/cloud/tcld/account/metrics/accepted-client-ca/remove)
