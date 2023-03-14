---
id: saml-how-to-configure-with-azure-ad
title: How to configure SAML with Azure AD
sidebar_label: Configure SAML with Azure AD
description: To use Azure AD as your SAML IdP, create an Azure AD Enterprise application.
tags:
  - guide-context
---

To use Azure AD as your SAML IdP, create an Azure AD Enterprise application.

1. Sign in to the [Microsoft Azure AD portal](https://portal.azure.com/).
1. On the home page under **Manage Azure Active Directory**, select **View**.
1. On the **Overview** page near the top, select **Add > Enterprise application**.
1. On the **Browse Azure AD Gallery** page near the top, select **Create your own application**.
1. In the **Create your own application** pane, provide a name for your application (such as `temporal-cloud`) and select **Integrate any other application you don't find in the gallery**.
1. Select **Save**.
1. In the **Getting Started** section, select **2. Set up single sign on**.
1. On the **Single sign-on** page, select **SAML**.
1. In the **Basic SAML Configuration** section of the **SAML-based Sign-on** page, select **Edit**.
1. In **Identifier (Entity ID)**, enter the following entity identifier, including your Account Id where indicated:

   ```bash
   urn:auth0:prod-tmprl:ACCOUNT_ID-saml
   ```

   A correctly formed entity identifier resembles the following:

   ```bash
   urn:auth0:prod-tmprl:f45a2-saml
   ```

1. In **Reply URL (Assertion Consumer Service URL)**, enter the following callback URL, including your Account Id where indicated:

   ```bash
   https://login.tmprl.cloud/login/callback?connection=ACCOUNT_ID-saml
   ```

   A correctly formed callback URL resembles the following:

   ```bash
   https://login.tmprl.cloud/login/callback?connection=f45a2-saml
   ```

1. You can leave the other fields blank.
   Near the top of the pane, select **Save**.
1. In the **Attributes & Claims** section, select **Edit**.
1. We require the user's full email address when connecting to Temporal.
   In **Required claim** section, verify that **Unique User Identifier (NameID)** is set to `user.userprincipalname [nameid-format:emailAddress]`.
1. Collect the information you need to send to us:
   - In the **SAML Certificates** section of the **SAML-based Sign-on** page, select the download link for **Certificate (Base64)**.
   - In the **Set up _APPLICATION_NAME_** section of the **SAML-based Sign-on** page, copy the value of **Login URL**.

To finish setting up Azure AD as your SAML IdP, see [Finish your SAML configuration](#finish-your-saml-configuration).
