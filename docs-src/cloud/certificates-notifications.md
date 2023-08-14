---
id: certificates-notifications
title: How to receive notifications about certificate expiration
sidebar_label: Expiration notifications
description: Temporal Cloud sends notifications when a certificate is close to expiration.
tags:
  - how-to
  - temporal cloud
  - certificates
---

To keep your Namespace secure and online, you must update the CA certificate for the Namespace _before_ the certificate expires.

To help you remember to do so, Temporal Cloud sends email notifications to users who have the Global Admin [Role](/cloud/users-account-level-roles) or the Namespace Admin [permission](/cloud/users-namespace-level-permissions) 15 days before expiration and, if necessary, 10 days before expiration.

If the certificate is not updated, 5 days before expiration Temporal Cloud creates a [support ticket](/cloud/support-create-ticket) on behalf of the Global Admins and Namespace Admins.

To ensure that you receive email notifications, configure your junk-email filters to permit email from `noreply@temporal.io`.

After a support ticket is created, admins should expect a follow-up from the Temporal Developer Success team.
