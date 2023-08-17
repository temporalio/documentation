---
id: audit-logging-supported-events
title: Which events are supported by Audit Logging?
sidebar_label: Supported events
description: Audit Logging currently supports Admin Operation events.
tags:
  - explanation
  - temporal cloud
  - audit logging
---

The first release of Audit Logging supports Admin Operation events.

### Admin Operation events

The following list specifies both the supported events and the Temporal APIs that emit the logs.

- Account
  - Configure Audit Logging: `UpdateAccount`
  - Configure observability: `UpdateAccount`
- User
  - Create user invitations: `InviteUsers`
  - Delete users: `DeleteUser`
  - Update user account-level Roles: `UpdateUser`
  - Update user Namespace permissions: `UpdateUserNamespacePermissions`
  - Log in user: `UserLogin`
- Namespace
  - Create Namespace: `CreateNamespace`
  - Update Namespace: `UpdateNamespace`
  - Delete Namespace: `DeleteNamespace`
  - Add or update certificates or certificate filters: `UpdateNamespace`
  - Add custom Search Attributes: `UpdateNamespace`
  - Rename custom Search Attribute: `RenameCustomSearchAttribute`
  - Request increase in Retention Period: `UpdateNamespace`

### Audit Log format

The log sent to the Kinesis stream is JSON in the following format:

```json
{
  "emit_time": // Time the operation was recorded
  "level": // Level of the log entry, such as info, warning, or error
  "user_email":  // Email address of the user who initiated the operation
  "operation":  // Operation that was performed
  "details":  // Details of the operation
  "status": // Status, such as OK or error
  "category":  // Category of the log entry: Admin or System
  "version": // Version of the log entry, beginning with 0 and updated when a backfill or resend of the same log occurs
  "log_id": // Unique ID of the log entry
}
```
