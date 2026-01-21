---
id: audit-logs
title: Audit Logs
sidebar_label: Audit Logs
description: Audit Logs in Temporal Cloud provide forensic information, integrating with a data streaming service for secure data handling and supporting key Admin and API Key operations. This streamlines audit and compliance processes.
slug: /cloud/audit-logs
toc_max_heading_level: 4
keywords:
  - audit logs
  - explanation
  - how-to
  - operations
  - temporal cloud
  - term
  - troubleshooting
tags:
  - Logs
  - Security
  - Temporal Cloud
---

Audit Logs is a feature of [Temporal Cloud](/cloud/overview) that provides forensic access information for a variety of operations in the Temporal Cloud control plane.

Audit Logs answers "who, when, and what" questions about Temporal Cloud resources.
These answers can help you evaluate the security of your organization, and they can provide information that you need to satisfy audit and compliance requirements.

You need the Account Owner or Global Administrator role to view Audit Logs via UI, use the API, or to configure an Audit Log Integration with [AWS Kinesis](/cloud/audit-logs-aws) or [GCP Pub/Sub](/cloud/audit-logs-gcp).

:::info

Audit Logs do NOT capture data plane events, like Workflow Start, Workflow Terminate, Schedule Create, etc.
Instead, explore the [Export](/cloud/export) feature, which does let you send closed Workflow Histories to external storage.

:::

## Which events are supported by Audit Logs? {#supported-events}

- Account
  - `ChangeAccountPlanType`: Change Account Plan Type
  - `UpdateAccountAPI`: Configure Audit Logs, Configure Observability Endpoint
- API Keys
  - `CreateAPIKey`: Create API Key
  - `DeleteAPIKey`: Delete API Key
  - `UpdateAPIKey`: Update API Key
- Connectivity Rules
  - `CreateConnectivityRule`: Create Connectivity Rule
  - `DeleteConnectivityRule`: Delete Connectivity Rule
- Namespace
  - `CreateNamespaceAPI`: Create Namespace
  - `DeleteNamespaceAPI`: Delete Namespace
  - `FailoverNamespacesAPI`: Failover (for High Availability Namespaces)
  - `RenameCustomSearchAttributeAPI`: Rename Custom Search Attribute
  - `UpdateNamespaceAPI`: Includes retention period changes, replica edits, authentication method updates, custom search attribute updates, and connectivity rule bindings
- Namespace Export
  - `CreateNamespaceExportSink`: Create Namespace Export Sink
  - `DeleteNamespaceExportSink`: Delete Namespace Export Sink
  - `UpdateNamespaceExportSink`: Update Namespace Export Sink
  - `ValidateNamespaceExportSink`: Validate Namespace Export Sink
- Nexus Endpoint
  - `CreateNexusEndpoint`: Create Nexus Endpoint
  - `DeleteNexusEndpoint`: Delete Nexus Endpoint
  - `UpdateNexusEndpoint`: Update Nexus Endpoint
- Service Accounts
  - `CreateServiceAccount`: Create Service Account
  - `CreateServiceAccountAPIKey`: Create Service Account API Key
  - `DeleteServiceAccount`: Delete Service Account
  - `UpdateServiceAccount`: Update Service Account
- User
  - `CreateUserAPI`: Create Users
  - `DeleteUserAPI`: Delete Users
  - `InviteUsersAPI`: Invite Users
  - `SetUserNamespaceAccessAPI`: Set User Namespace Access
  - `UpdateIdentityNamespacePermissionsAPI`: Update Identity Namespace Permissions
  - `UpdateUserAPI`: Update User Account-level Roles
  - `UpdateUserNamespacePermissionsAPI`: Update User Namespace Permissions
- User Groups
  - `CreateUserGroup`: Create User Group
  - `DeleteUserGroup`: Delete User Group
  - `SetUserGroupNamespaceAccess`: Set User Group Namespace Access
  - `UpdateUserGroup`: Update User Group

### Audit Log format

:::info DEPRECATION NOTICE

The following fields are deprecated and are planned for removal on or after April 1 2026. 

- `user_email`.  This field is duplicated by `principal.name` for principals of type `user`. Other principal types do not have associated emails.
- `level`.  This field is duplicated by `status`.
- `caller_ip_address`.  This field is replaced by `x_forwarded_for`.
- `details`.  This field is replaced by `raw_details` that includes request details.
- `category`.  This field is no longer used.

:::

Audit Logs use the following JSON format:

```json
{
  "operation":  // Operation that was performed
  "principal": // Information about who initiated the operation
  "details":  // DEPRECATED, see raw_details
  "raw_details": // details about the request
  "user_email":  // DEPRECATED, use principal.user where applicable
  "x_forwarded_for": // the IP address making the call
  "caller_ip_address": // DEPRECATED, use x_forwarded_for
  "category":  // DEPRECATED, no longer used
  "emit_time": // Time the operation was recorded
  "level": // DEPRECATED, use status
  "log_id": // Unique ID of the log entry
  "request_id": // Optional async request id set by the user when sending a request
  "status": // Status, such as OK or ERROR
  "version": // Version of the log entry
}
```

:::note

The [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) format is a comma-separated list of IP addresses which should be evaluated from the last to the first, until meeting the first untrusted IP address of the list. This allows for instance to consider proxies in the path.

Temporal provides the caller IP address in that format to allow customers to identify a caller IP address even if one (or more proxies) are in the network path to reach Temporal Cloud.

:::

### Example of an Audit Log

```json
[
  {
    "operation": "UserLogin",
    "status": "OK",
    "version": 2,
    "logId": "edb3aa3e-78c4-48fc-9c7e-2078c6989775",
    "xForwardedFor": "10.1.2.3",
    "asyncOperationId": "",
    "emitTime": {
      "$typeName": "google.protobuf.Timestamp",
      "seconds": 1759436617,
      "nanos": 48000000
    },
    "principal": {
      "type": "user",
      "id": "",
      "name": "user@email.com",
      "apiKeyId": ""
    }
  },
  {
    "operation": "UserLogin",
    "status": "OK",
    "version": 2,
    "logId": "5fe6a81e-8d3c-4f4d-88a5-52db864c9ea5",
    "xForwardedFor": "10.1.2.3",
    "asyncOperationId": "",
    "emitTime": {
      "seconds": 1759178573,
      "nanos": 671000000
    },
    "principal": {
      "type": "user",
      "id": "",
      "name": "user@email.com",
      "apiKeyId": ""
    }
  }
]
```

## How to configure an Audit Log Integration {#configure-audit-logs}

Audit Logs can be configured in AWS Kinesis or GCP Pub/Sub.

- [AWS Kinesis Instructions](/cloud/audit-logs-aws)
- [GCP Pub/Sub Instructions](/cloud/audit-logs-gcp)

## How to troubleshoot Audit Log sink {#troubleshoot-audit-logs}

The Audit Logs page of the Temporal Cloud UI provides the current status of an Audit Log Integration.

- If an error is detected, a summary of the error appears below the page title.
- If the Audit Log Integration is functioning normally, an **On** badge appears next to the page heading.

After an Admin Operation is performed, users can see Audit Log messages flow through the stream.

Upon successful configuration of the Audit Log sink and set up of a stream, you will receive events within the hour of setup.
Temporal is able to retain Audit Log information for up to 30 days.
To retrieve logs up to the past 30 days, you will need to file a request.

If you experience an issue with an Audit Log sink, we can provide the missing audit information.
Open a support ticket to request assistance.

## How to delete an Audit Log sink {#delete-an-audit-log-sink}

To delete an Audit Log sink, follow these steps:

1. In the Temporal Cloud UI, select **Settings**.
1. On the **Settings** page, select **Audit Logs**.
1. In the **Audit Logs Integration** card, select **Edit**.
1. At the bottom of the **Audit Logs Integration** page, choose **Delete**.

After you confirm the deletion, the Audit Log Sink is removed from your account and logs stop flowing to your stream.


## View an Audit Log {#view-an-audit-log}

An Audit Log can be viewed in the Temporal Cloud UI.
1. In the Temporal Cloud UI, select **Settings**.
1. On the **Settings** page, select **Audit Logs**.

Up to 1000 events can be downloaded from the Audit Log UI to a local file.

## Access an Audit Log via API {#audit-log-api}

An Audit Log can be accessed using the [Temporal Cloud Ops API](/ops). Use the API to access
an Audit Log if you wish to make dashboards for viewing an Audit Log outside of Temporal Cloud.
If your goal is to export an Audit Log, it is better to use an Audit Log sink and capture each 
entry as it is generated.

Audit Logs are accessible for the past 30 days using the API.

The API allows:
- StartTimeInclusive: Filter for UTC time >= (defaults to 30 days ago) - optional
- EndTimeExclusive: Filter for UTC time < (defaults to current time) - optional
- PageSize: Cannot exceed 1000. Defaults to 100. - optional
- PageToken: The page token if this is continuing from another response - optional


