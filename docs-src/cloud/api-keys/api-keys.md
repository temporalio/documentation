---
id: api-keys
title: API Keys
sidebar_label: API Keys
description: Temporal Cloud supports API Key Authentication, which provides you with a secure way to access Temporal Cloud programmatically.
tags:
  - explanation
ssdi:
  - API Keys is a new feature for Temporal Cloud. It is being released as a Public Preview.
---

Temporal Cloud supports secure programmatic access through API Key Authentication.

## Overview

Temporal Cloud API Keys facilitate user-level authentication.
Each key is unique to a single user and ties directly to their Role-Based Access Control (RBAC) settings, ensuring secure and appropriate access.

The process is as follows:

```text
API Key (authentication) → User (identity) → RBAC (authorization)
```

These API Keys are integral for authenticating Temporal Cloud operator tools, including Temporal Cloud CLI (tcld) and the Temporal Cloud Operations API.

Users have the autonomy to generate, delete, and disable their API Keys through the Cloud UI or tcld.

For broader oversight, global administrators can manage (monitor, delete, disable) user API Keys using the same interfaces.

:::note

Future updates to Temporal Cloud will expand identity options to include Service Accounts, and extend API Key support for client connections, such as SDKs and Temporal CLI.

:::
