---
id: api-keys
title: API Keys
sidebar_label: API Keys
description: Temporal Cloud supports API Key Authentication, which provides you with a secure way to access Temporal Cloud programmatically.
tags:
  - explanation
ssdi:
  - API Keys is in a Public Preview release status for Temporal Cloud.
---

Temporal Cloud supports secure programmatic access through API Key Authentication.

## Overview

Temporal Cloud API Keys facilitate user-level authentication.
Each key is unique to a single user and ties directly to their Role-Based Access Control (RBAC) settings, ensuring secure and appropriate access.

The process is as follows:

```text
API Key (authentication) → User (identity) → RBAC (authorization)
```

These API Keys are integral for authenticating Temporal Cloud operator tools, including [Temporal Cloud CLI (tcld)](/cloud/tcld/index) and the [Temporal Cloud Operations API](/cloud/cloud-ops-api).

Users have the autonomy to create, delete, and update access to their API Keys through the Cloud UI or tcld.

API Keys are an opt-in feature that must be enabled by a Global Administrator for use.
For broader oversight, Global Administrators can manage user's API Keys using the same interfaces.
For instructions on API Key Management for your organization, see [global Administrator API Key Management](/cloud/api-keys/manage-api-keys#global-administrator-api-key-management).
