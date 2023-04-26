---
id: saml-finish
title: How to finish your SAML configuration
sidebar_label: Finish SAML configuration
description: To finish your SAML configuration, send us the sign-in URL, X.509 certificate, and IdP domains and then test your connection.
tags:
  - guide-context
---

After you configure SAML with your IdP, we can finish the configuration on our side.
To do that, [create a support ticket](/cloud/how-to-create-a-ticket-for-temporal-support) and send the following information to us:

- The sign-in URL from your application
- The X.509 SAML sign-in certificate
- At least one IdP domain to map to the SAML connection

Generally, your IdP domain is the same as the domain for your email address.
You can provide multiple IdP domains.

When you receive confirmation from us that we have finished configuration, log in to Temporal Cloud.
This time, though, enter your email address in **Enterprise identity** and select **Continue**.
Do not select **Continue with Google** or **Continue with Microsoft**.
You will be redirected to the authentication page of your IdP.
