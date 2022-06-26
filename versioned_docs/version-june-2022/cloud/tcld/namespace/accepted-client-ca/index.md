---
id: index
title: tcld namespace accepted-client-ca
description: How to manage the client CA certificates for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace accepted-client-ca` commands manage the client CA certificates of the specified [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud. The certificates are used to verify client connections.

:::important

Do not use a CA certificate that is signed with an insecure signature algorithm, such as SHA-1.
Such signatures will be rejected.
Existing CA certificates that use SHA-1 can stop working without warning.

For more information on the vulnerabilities of SHA-1, see [SHAttered](https://shattered.io/).

:::

Alias: `ca`

- [`tcld namespace accepted-client-ca add`](/cloud/tcld/namespace/accepted-client-ca/add)
- [`tcld namespace accepted-client-ca list`](/cloud/tcld/namespace/accepted-client-ca/list)
- [`tcld namespace accepted-client-ca set`](/cloud/tcld/namespace/accepted-client-ca/set)
- [`tcld namespace accepted-client-ca remove`](/cloud/tcld/namespace/accepted-client-ca/remove)
