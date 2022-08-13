---
id: how-to-manage-certificate-filters-in-temporal-cloud
title: How to manage certificate filters in Temporal Cloud
sidebar_label: Manage certificate filters
description: To limit access to specific CA certificates, you can create certificate filters.
tags:
  - how-to
---

To limit access to specific [CA certificates](/cloud/how-to-manage-certificates-in-temporal-cloud), you can create certificate filters.
Each filter contains values for one or more of the following fields:

- commonName (CN)
- organization (O)
- organizationalUnit (OU)
- subjectAlternativeName (SAN)

Corresponding fields in the client certificate must match every specified value in the filter.
In the following example, only the CN field of the certificate's subject is checked, and it must be exactly `code.example.com`.
The other fields are not checked.

```json
AuthorizedClientCertificate {
  CN : "code.example.com"
}
```

In the following example, the CN field must be `stage.example.com` and the O field must be `Example Code Inc.`

```json
AuthorizedClientCertificate {
  CN : "stage.example.com"
  O : "Example Code Inc."
}
```

The values for the fields are case-insensitive.
If no wildcard is used, each specified value must match its field exactly.

To match a substring, place a single `*` wildcard at the beginning or end (but not both) of a value.
You cannot use a `*` wildcard by itself.

For example, the following values are valid:

- `*.example.com` matches `code.example.com` and `text.example.com`.
- `Example Code*` matches `Example code` and `Example Code Inc`.

The following values are not valid:

- `.example.*`
- `code.*.com`
- `*`

You can create a maximum of 25 certificate filters in a Namespace.

If you use a certificate that was issued by a well-known CA, you cannot clear a certificate filter for that certificate.

<!--- How to manage certificate filters in Temporal Cloud using Temporal Web UI --->

## Manage certificate filters using Web UI

This functionality is in development.

<!--- How to manage certificate filters in Temporal Cloud using tcld --->

## Manage certificate filters using tcld

To set or clear certificate filters, use the following [tcld](/cloud/tcld) commands:

- [tcld namespace certificate-filters import](/cloud/tcld/namespace/certificate-filters/import)
- [tcld namespace certificate-filters clear](/cloud/tcld/namespace/certificate-filters/clear)
