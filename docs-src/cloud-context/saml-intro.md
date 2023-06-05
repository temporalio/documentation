---
id: saml-intro
title: How to manage SAML authentication with Temporal Cloud
sidebar_label: Manage SAML
description: To authenticate users of your Temporal Cloud account, you can connect an IdP using SAML 2.0.
tags:
  - guide-context
---

To authenticate the users of your Temporal Cloud account, you can connect an identity provider (IdP) to your account by using Security Assertion Markup Language (SAML) 2.0.

:::info

Enabling this feature adds a charge to your account.
For more information, contact your account manager.

:::

## Integrate SAML with your Temporal Cloud account

1. Locate your [Temporal Cloud Account Id](/concepts/what-is-a-cloud-account-id).
   One way to do so is to sign in to Temporal Cloud and find your [Namespace Id](/concepts/what-is-a-cloud-namespace-id).
   The Account Id is the five or six characters following the period (.), such as `f45a2`.
   You will need the Account Id to construct your callback URL and your entity identifier.
1. Configure SAML with your IdP by following one of these sets of instructions:
   - [Microsoft Azure Active Directory (Azure AD)](#configure-saml-with-azure-ad)
   - [Okta](#configure-saml-with-okta)
1. [Share your connection information with us and test your connection.](#finish-saml-configuration)
