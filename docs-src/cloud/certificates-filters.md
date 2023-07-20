---
id: certificates-filters
title: How to manage certificate filters in Temporal Cloud
sidebar_label: Manage certificate filters
description: To limit access to specific CA certificates, you can create certificate filters.
tags:
  - guide-context
---

To limit access to specific [end-entity certificates](/cloud/how-to-manage-certificates-in-temporal-cloud), you can create certificate filters.
Each filter contains values for one or more of the following fields:

- commonName (CN)
- organization (O)
- organizationalUnit (OU)
- subjectAlternativeName (SAN)

Corresponding fields in the client certificate must match every specified value in the filter.

The values for the fields are case-insensitive.
If no wildcard is used, each specified value must match its field exactly.

To match a substring, place a single `*` wildcard at the beginning or end (but not both) of a value.
You cannot use a `*` wildcard by itself.

You can create a maximum of 25 certificate filters in a Namespace.

If you provide a well-known CA certificate, you cannot clear a certificate filter.
A well-known CA certificate is one that is typically included in the certificate store of an operating system.

**Examples**

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

When using a `*` wildcard, the following values are valid:

- `*.example.com` matches `code.example.com` and `text.example.com`.
- `Example Code*` matches `Example code` and `Example Code Inc`.

The following values are not valid:

- `.example.*`
- `code.*.com`
- `*`

<!--- How to manage certificate filters in Temporal Cloud using Temporal Cloud UI --->

### Manage certificate filters using Temporal Cloud UI

To add or remove a certificate filter, follow these steps:

1. On the left side of the window, click **Namespaces**.
1. On the **Namespaces** page, click the name of the Namespace to manage.
1. On the right side of the page for the selected Namespace, click **Edit**.
1. On the **Edit** page, click **Certificate Filters**.
   - To add a certificate filter, click **Add a Certificate Filter** and enter values in one or more fields.
   - To remove a certificate filter, click the **×** in the upper-right corner of the filter details.
1. To cancel your changes, click **Back to Namespace**. To save your changes, click **Save**.

<!--- How to manage certificate filters in Temporal Cloud using tcld --->

### Manage certificate filters using tcld

To set or clear certificate filters, use the following [tcld](/cloud/tcld) commands:

- [tcld namespace certificate-filters import](/cloud/tcld/namespace/certificate-filters/import)
- [tcld namespace certificate-filters clear](/cloud/tcld/namespace/certificate-filters/clear)

To view the current certificate filters, use the [tcld namespace certificate-filters export](/cloud/tcld/namespace/certificate-filters/export) command.
