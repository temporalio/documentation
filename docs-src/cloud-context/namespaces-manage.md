---
id: namespaces-manage
title: How to manage Namespaces in Temporal Cloud
sidebar_label: Manage Namespaces
description: To manage Namespaces in Temporal Cloud, use either Temporal Cloud UI or tcld.
tags:
  - how-to
---

<!--- How to manage Namespaces in Temporal Cloud using Temporal Cloud UI --->

### Manage Namespaces in Temporal Cloud using Temporal Cloud UI

To list Namespaces:

- On the left side of the window, click **Namespaces**.

To edit a Namespace (including custom Search Attributes, certificates, certificate filters, and permissions), find the Namespace and do either of the following:

- On the right end of the Namespace row, click the three vertical dots (⋮). Click **Edit**.
- Click the Namespace name. In the top-right portion of the page, click **Edit**.

On the **Edit** page, you can do the following:

- Add a [custom Search Attribute](/visibility#custom-search-attributes).
- [Manage CA certificates](/cloud/how-to-manage-certificates-in-temporal-cloud).
- [Manage certificate filters](/cloud/how-to-manage-certificates-in-temporal-cloud#manage-certificate-filters-using-temporal-cloud-ui).
- Manage [Namespace-level permissions](/cloud/#namespace-level-permissions).

After you make changes, click **Save** in the top-right or bottom-left portion of the page.

<!--- How to manage Namespaces in Temporal Cloud using tcld --->

### Manage Namespaces in Temporal Cloud using tcld

To list Namespaces and get information about them, use the following [tcld](/cloud/tcld/) commands:

- [tcld namespace list](/cloud/tcld/namespace/list)
- [tcld namespace get](/cloud/tcld/namespace/get)

To manage certificates, use the [tcld namespace accepted-client-ca](/cloud/tcld/namespace/accepted-client-ca/index) commands.
For more information, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud).

To manage certificate filters, use the [tcld namespace certificate-filters](/cloud/tcld/namespace/certificate-filters/index) commands.
For more information, see [How to manage certificate filters in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud#manage-certificate-filters).
