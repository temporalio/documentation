---
id: saml-finish
title: How to finish your SAML configuration
sidebar_label: Finish SAML configuration
description: To finish your SAML configuration, send us the sign-in URL, X.509 certificate, and IdP domains and then test your connection.
tags:
  - temporal-cloud
  - security
  - how-to
---

After you configure SAML with your IdP, we can finish the configuration on our side.
[Create a support ticket](/cloud/support-create-ticket) that includes the following information:

- The sign-in URL from your application
- The X.509 SAML sign-in certificate
- One or more IdP domains to map to the SAML connection

Generally, the provided IdP domain is the same as the domain for your email address.
You can provide multiple IdP domains.

When you receive confirmation from us that we have finished configuration, log in to Temporal Cloud.
This time, though, enter your email address in **Enterprise identity** and select **Continue**.
Do not select **Continue with Google** or **Continue with Microsoft**.
You will be redirected to the authentication page of your IdP.
