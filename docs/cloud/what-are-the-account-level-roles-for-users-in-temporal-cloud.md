---
id: what-are-the-account-level-roles-for-users-in-temporal-cloud
title: What are the account-level Roles for users in Temporal Cloud?
sidebar_label: Account-level Roles
description: Account-level Roles are Global Admin, Developer, and Read-Only.
---

When a Global Admin invites a user to join an account, the Global Admin selects one of the following Roles for that user:

- **Global Admin**
  - Has full administrative permissions across the account, including users, usage, and billing.
  - Has Namespace Admin [permissions](/cloud/what-are-the-namespace-level-permissions-for-users-in-temporal-cloud) on all [Namespaces](/namespaces) in the account
  - Cannot remote
- **Developer**
  - Can create, rename, update, and delete Namespaces and [Workflows](/workflows)
  - Has Namespace Admin permissions for each Namespace created by that user
- **Read-Only:** Can read information but not change any
