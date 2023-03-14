---
id: saml-how-to-configure-with-okta
title: How to configure SAML with Okta
sidebar_label: Configure SAML with Okta
description: To use Okta as your SAML IdP, configure a new Okta application integration.
tags:
  - guide-context
---

To use Okta as your SAML IdP, configure a new Okta application integration.

1. Sign in to the [Okta Admin Console](https://www.okta.com/login/).
1. In the left navigation pane, select **Applications > Applications**.
1. On the **Applications** page, select **Create App Integration**.
1. In the **Create a new app integration** dialog, select **SAML 2.0** and then select **Next**.
1. On the **Create SAML Integration** page in the **General Settings** section, provide a name for your application (such as `temporal-cloud`) and then select **Next**.
1. In the **Configure SAML** section in **Single sign on URL**, enter the following callback URL, including your Account Id where indicated:

   ```bash
   https://login.tmprl.cloud/login/callback?connection=ACCOUNT_ID-saml
   ```

   A correctly formed callback URL resembles the following:

   ```bash
   https://login.tmprl.cloud/login/callback?connection=f45a2-saml
   ```
1. In **Audience URI (SP Entity ID)**, enter the following entity identifier, including your Account Id where indicated:

   ```bash
   urn:auth0:prod-tmprl:ACCOUNT_ID-saml
   ```

   A correctly formed entity identifier resembles the following:

   ```bash
   urn:auth0:prod-tmprl:f45a2-saml
   ```

1. We require the user's full email address when connecting to Temporal.
   In **Name ID format**, select `EmailAddress`.
1. Select **Next**.
1. In the **Feedback** section, select **Finish**.
1. On the **Applications** page, select the name of the application integration you just created.
1. On the application integration page, select the **Sign On** tab.
1. Under **SAML Setup**, select **View SAML setup instructions**.
1. Collect the information you need to send to us:
   - Copy the IdP settings.
   - Download the active certificate.

To finish setting up Okta as your SAML IdP, see the next section, [Finish your SAML configuration](#finish-your-saml-configuration).
