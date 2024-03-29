---
id: action-groups
title: Account-level Roles and Namespace-level permissions
sidebar_label: Account-level Roles and Namespace-level permissions
description: Account-level Roles and Namespace-level permissions for Temporal Cloud and Temporal Server.
---

Temporal account-level Roles and Namespace-level permissions provide access to specific Temporal Workflow and Temporal Cloud operational APIs.
The following table provides the API details associated with each account-level Role and Namespace-level permission.

:::note

Account Global Admin has Namespace Admin permissions on Namespaces.

:::

#### Account-level Role details

This table provides API-level details for the permissions granted to a user through account-level Roles. These permissions are configured per user.

| Permission                     | Global Admin | Developer | Read-only |
| ------------------------------ | ------------ | --------- | --------- |
| CountIdentities                | ✔            | ✔         | ✔         |
| CreateAPIKey                   | ✔            | ✔         | ✔         |
| CreateNamespace                | ✔            | ✔         |           |
| CreateServiceAccount           | ✔            |           |           |
| CreateServiceAccountAPIKey     | ✔            |           |           |
| CreateUser                     | ✔            |           |           |
| DeleteAPIKey                   | ✔            | ✔         | ✔         |
| DeleteServiceAccount           | ✔            |           |           |
| DeleteUser                     | ✔            |           |           |
| GetAccount                     | ✔            | ✔         | ✔         |
| GetAccountFeatureFlags         | ✔            | ✔         | ✔         |
| GetAccountLimits               | ✔            | ✔         | ✔         |
| GetAccountSettings             | ✔            | ✔         | ✔         |
| GetAccountUsage                | ✔            |           |           |
| GetAPIKey                      | ✔            | ✔         | ✔         |
| GetAPIKeys                     | ✔            | ✔         | ✔         |
| GetAsyncOperation              | ✔            | ✔         | ✔         |
| GetDecodedCertificate          | ✔            | ✔         | ✔         |
| GetIdentities                  | ✔            | ✔         | ✔         |
| GetIdentity                    | ✔            | ✔         | ✔         |
| GetNamespaces                  | ✔            | ✔         | ✔         |
| GetNamespacesUsage             | ✔            |           |           |
| GetRegion                      | ✔            | ✔         | ✔         |
| GetRegions                     | ✔            | ✔         | ✔         |
| GetRequestStatus               | ✔            | ✔         | ✔         |
| GetRequestStatuses             | ✔            |           |           |
| GetRequestStatusesForNamespace | ✔            | ✔         | ✔         |
| GetRequestStatusesForUser      | ✔            | ✔         | ✔         |
| GetRoles                       | ✔            | ✔         | ✔         |
| GetRolesByPermissions          | ✔            | ✔         | ✔         |
| GetServiceAccount              | ✔            | ✔         | ✔         |
| GetServiceAccounts             | ✔            | ✔         | ✔         |
| GetUser                        | ✔            | ✔         | ✔         |
| GetUsers                       | ✔            | ✔         | ✔         |
| GetUsersWithAccountRoles       | ✔            | ✔         | ✔         |
| InviteUsers                    | ✔            |           |           |
| ListCreditLedgerEntries        | ✔            |           |           |
| ListGrants                     | ✔            |           |           |
| ListNamespaces                 | ✔            | ✔         | ✔         |
| ResendUserInvite               | ✔            |           |           |
| SetAccountSettings             | ✔            |           |           |
| SyncCurrentUserInvite          | ✔            | ✔         | ✔         |
| UpdateAccount                  | ✔            |           |           |
| UpdateAPIKey                   | ✔            | ✔         | ✔         |
| UpdateServiceAccount           | ✔            |           |           |
| UpdateUser                     | ✔            |           |           |

#### Namespace-level permissions details

This table provides API-level details for the permissions granted to a user through Namespace-level permissions. These permissions are configured per Namespace per user.

| Permission                         | Namespace Admin | Write | Read |
| ---------------------------------- | --------------- | ----- | ---- |
| CountWorkflowExecutions            | ✔               | ✔     | ✔    |
| CreateExportSink                   | ✔               | ✔     |      |
| CreateSchedule                     | ✔               | ✔     |      |
| DeleteExportSink                   | ✔               | ✔     |      |
| DeleteNamespace                    | ✔               | ✔     |      |
| DeleteSchedule                     | ✔               | ✔     |      |
| DescribeBatchOperation             | ✔               | ✔     | ✔    |
| DescribeNamespace                  | ✔               | ✔     | ✔    |
| DescribeSchedule                   | ✔               | ✔     | ✔    |
| DescribeTaskQueue                  | ✔               | ✔     | ✔    |
| DescribeWorkflowExecution          | ✔               | ✔     | ✔    |
| FailoverNamespace                  | ✔               |       |      |
| GetExportSink                      | ✔               | ✔     | ✔    |
| GetExportSinks                     | ✔               | ✔     | ✔    |
| GetNamespace                       | ✔               | ✔     | ✔    |
| GetNamespaceUsage                  | ✔               | ✔     | ✔    |
| GetReplicationStatus               | ✔               | ✔     | ✔    |
| GetSearchAttributes                | ✔               | ✔     | ✔    |
| GetUsersForNamespace               | ✔               | ✔     | ✔    |
| GetWorkerBuildIdCompatibility      | ✔               | ✔     | ✔    |
| GetWorkerTaskReachability          | ✔               | ✔     | ✔    |
| GetWorkflowExecutionHistory        | ✔               | ✔     | ✔    |
| GetWorkflowExecutionHistoryReverse | ✔               | ✔     | ✔    |
| GlobalizeNamespace                 | ✔               |       |      |
| ListBatchOperations                | ✔               | ✔     | ✔    |
| ListClosedWorkflowExecutions       | ✔               | ✔     | ✔    |
| ListExportSinks                    | ✔               | ✔     | ✔    |
| ListFailoverHistoryByNamespace     | ✔               | ✔     | ✔    |
| ListOpenWorkflowExecutions         | ✔               | ✔     | ✔    |
| ListReplicaStatus                  | ✔               | ✔     | ✔    |
| ListScheduleMatchingTimes          | ✔               | ✔     | ✔    |
| ListSchedules                      | ✔               | ✔     | ✔    |
| ListTaskQueuePartitions            | ✔               | ✔     | ✔    |
| ListWorkflowExecutions             | ✔               | ✔     | ✔    |
| PatchSchedule                      | ✔               | ✔     |      |
| PollActivityTaskQueue              | ✔               | ✔     |      |
| PollWorkflowTaskQueue              | ✔               | ✔     |      |
| QueryWorkflow                      | ✔               | ✔     | ✔    |
| RecordActivityTaskHeartbeat        | ✔               | ✔     |      |
| RecordActivityTaskHeartbeatById    | ✔               | ✔     |      |
| RenameCustomSearchAttribute        | ✔               | ✔     |      |
| RequestCancelWorkflowExecution     | ✔               | ✔     |      |
| ResetStickyTaskQueue               | ✔               | ✔     |      |
| ResetWorkflowExecution             | ✔               | ✔     |      |
| RespondActivityTaskCanceled        | ✔               | ✔     |      |
| RespondActivityTaskCanceledById    | ✔               | ✔     |      |
| RespondActivityTaskCompleted       | ✔               | ✔     |      |
| RespondActivityTaskCompletedById   | ✔               | ✔     |      |
| RespondActivityTaskFailed          | ✔               | ✔     |      |
| RespondActivityTaskFailedById      | ✔               | ✔     |      |
| RespondQueryTaskCompleted          | ✔               | ✔     |      |
| RespondWorkflowTaskCompleted       | ✔               | ✔     |      |
| RespondWorkflowTaskFailed          | ✔               | ✔     |      |
| SetUserNamespaceAccess             | ✔               |       |      |
| SignalWithStartWorkflowExecution   | ✔               | ✔     |      |
| SignalWorkflowExecution            | ✔               | ✔     |      |
| StartBatchOperation                | ✔               | ✔     |      |
| StartWorkflowExecution             | ✔               | ✔     |      |
| StopBatchOperation                 | ✔               | ✔     |      |
| TerminateWorkflowExecution         | ✔               | ✔     |      |
| UpdateExportSink                   | ✔               | ✔     |      |
| UpdateNamespace                    | ✔               | ✔     |      |
| UpdateSchedule                     | ✔               | ✔     |      |
| UpdateUserNamespacePermissions     | ✔               |       |      |
| ValidateExportSink                 | ✔               | ✔     |      |
| ValidateGlobalizeNamespace         | ✔               |       |      |
