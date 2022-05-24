---
id: index
title: tcld namespace update accepted-client-ca
description: How to manage the client CA certificate for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace update accepted-client-ca` commands manage the client CA certificate of the specified [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud. The certificate is used to verify client connections.

:::important

Do not use a CA certificate that is signed with an insecure signature algorithm, such as SHA-1.
Such signatures will be rejected.
Existing CA certificates that use SHA-1 can stop working without warning.

For more information on the vulnerabilities of SHA-1, see [SHAttered](https://shattered.io/).

:::


Alias: `ca`

- [`tcld namespace update accepted-client-ca set`](/cloud/tcld/namespace/update/accepted-client-ca/set)
