---
id: namespaces-manage
title: How to manage Namespaces in Temporal Cloud
sidebar_label: Manage Namespaces
description: To manage Namespaces in Temporal Cloud, use either Temporal Cloud UI or tcld.
tags:
  - how-to
  - namespaces
  - temporal cloud
---

<!--- How to manage Namespaces in Temporal Cloud using Temporal Cloud UI --->

### Manage Namespaces in Temporal Cloud using Temporal Cloud UI

To list Namespaces:

- On the left side of the window, select **Namespaces**.

To edit a Namespace (including custom Search Attributes, certificates, certificate filters, Codec Server endpoint, permissions, and users), find the Namespace and do either of the following:

- On the right end of the Namespace row, select the three vertical dots (⋮). Click **Edit**.
- Select the Namespace name. In the top-right portion of the page, select **Edit**.

On the **Edit** page, you can do the following:

- Add a [custom Search Attribute](/visibility#custom-search-attributes).
- [Manage CA certificates](/cloud/certificates).
- [Manage certificate filters](/cloud/certificates-filters#manage-certificate-filters-using-temporal-cloud-ui).
- Set [Codec Server endpoint](/self-hosted/how-to-set-up-codec-server#set-your-codec-server-endpoints-with-web-ui-and-cli) for all users on the Namespace.
  Each user on the Namespace has the option to [override this setting](/self-hosted/how-to-set-up-codec-server#web-ui) in their browser.
- Manage [Namespace-level permissions](/cloud/users-namespace-level-permissions).
- Add users.

To add a user to a Namespace, scroll to the bottom of the page and select **Add User**.

After you make changes, select **Save** in the top-right or bottom-left portion of the page.

<!--- How to manage Namespaces in Temporal Cloud using tcld --->

### Manage Namespaces in Temporal Cloud using tcld

To list Namespaces and get information about them, use the following [tcld](/cloud/tcld/) commands:

- [tcld namespace list](/cloud/tcld/namespace/list)
- [tcld namespace get](/cloud/tcld/namespace/get)

To manage certificates, use the [tcld namespace accepted-client-ca](/cloud/tcld/namespace/accepted-client-ca/index) commands.
For more information, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

To manage certificate filters, use the [tcld namespace certificate-filters](/cloud/tcld/namespace/certificate-filters/index) commands.
For more information, see [How to manage certificate filters in Temporal Cloud](/cloud/certificates-intro#manage-certificate-filters).
