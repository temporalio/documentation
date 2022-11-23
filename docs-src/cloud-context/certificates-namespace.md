---
id: certificates-namespace
title: How to add, update, and remove certificates in a Temporal Cloud Namespace
sidebar_label: Manage certificates
description: To manage certificates for Temporal Cloud Namespaces, use the `tcld namespace accepted-client-ca` commands.
tags:
  - guide-context
---

:::note

To manage certificates for a Namespace, a user must have [Namespace Admin](/cloud/#namespace-level-permissions) permission for that Namespace.

:::

To manage certificates for Temporal Cloud Namespaces, use the **Namespaces** page in Temporal Cloud UI or the [tcld namespace accepted-client-ca](/cloud/tcld/namespace/accepted-client-ca/index) commands.

Don't let your certificates expire!
Add reminders to your calendar to issue new CA certificates well before the expiration dates of the existing ones.

When updating CA certificates, it's important to follow a rollover process.
Doing so enables your Namespace to serve both CA certificates for a period of time until traffic to your old CA certificate ceases.

<!--- How to update certificates in Temporal Cloud using Temporal Cloud UI --->

### Update certificates using Temporal Cloud UI

1. On the left side of the window, select **Namespaces**.

1. Select the name of the Namespace to update.

1. In the top-right portion of the page for the Namespace, select **Edit**.

1. On the **Edit** page, select the **CA Certificates** card to expand it.

1. In the certificates box, scroll to the end of the existing certificate (that is, past `-----END CERTIFICATE-----`).

1. Paste the entire PEM block of the new certificate.

1. Select **Save**.

1. Monitor traffic to your old certificate until it ceases.

1. Return to the **Edit** page of the Namespace and select the **CA Certificates** card.

1. In the certificates box, delete the old certificate, leaving the new one in place.

1. Select **Save**.

<!--- How to update certificates in Temporal Cloud using tcld --->

### Update certificates using tcld

1. Create a single file that contains both your old and new CA certificate PEM blocks.
   Just concatenate the PEM blocks on adjacent lines.

   ```
   -----BEGIN CERTIFICATE-----
   ... old CA cert ...
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   ... new CA cert ...
   -----END CERTIFICATE-----
   ```

1. Run the `tcld namespace accepted-client-ca set` command with the CA certificate bundle file.

   ```bash
   tcld namespace accepted-client-ca set --ca-certificate-file <path>
   ```

1. Monitor traffic to your old certificate until it ceases.

1. Create another file that contains only the new CA certificate.

1. Run the `tcld namespace accepted-client-ca set` command again with the updated CA certificate bundle file.
