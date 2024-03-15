---
id: action-groups
title: Action groups
sidebar_label: Action groups
description: Action groups permissions for Temporal Cloud and Temporal Server.
---

Action groups define the permissions and access control for different roles within Temporal Cloud and Temporal Server. They determine which APIs and resources each role (admin, developer, read, write, etc.) can access and interact with.

### Cloud Management APIs

| Permission                     | Admin | Developer | Read | Write | Account |
| ------------------------------ | ----- | --------- | ---- | ----- | ------- |
| CreateAPIKey                   |       |           |      |       | ✔       |
| CreateExportSink               | ✔     |           |      | ✔     |         |
| CreateNamespace                |       |           |      |       |         |
| CreateServiceAccount           |       |           |      |       |         |
| CreateServiceAccountAPIKey     |       |           |      |       |         |
| CreateUser                     |       |           |      |       |         |
| DeleteAPIKey                   |       |           |      |       | ✔       |
| DeleteExportSink               | ✔     |           |      | ✔     |         |
| DeleteNamespace                | ✔     |           |      | ✔     |         |
| DeleteServiceAccount           |       |           |      |       |         |
| DeleteUser                     |       |           |      |       |         |
| FailoverNamespace              | ✔     |           |      |       |         |
| GetAccount                     |       |           |      |       | ✔       |
| GetAccountFeatureFlags         |       |           |      |       | ✔       |
| GetAccountLimits               |       |           |      |       | ✔       |
| GetAccountSettings             |       |           |      |       | ✔       |
| GetAccountUsage                |       |           |      |       |         |
| GetAPIKey                      |       |           |      |       | ✔       |
| GetAPIKeys                     |       |           |      |       | ✔       |
| GetAsyncOperation              |       |           |      |       | ✔       |
| GetDecodedCertificate          |       |           |      |       | ✔       |
| GetExportSink                  | ✔     |           | ✔    | ✔     |         |
| GetExportSinks                 | ✔     |           | ✔    | ✔     |         |
| GetIdentities                  |       |           |      |       | ✔       |
| GetIdentity                    |       |           |      |       | ✔       |
| GetNamespace                   | ✔     |           | ✔    | ✔     |         |
| GetNamespaces                  |       |           |      |       | ✔       |
| GetNamespacesUsage             |       |           |      |       |         |
| GetNamespaceUsage              | ✔     |           | ✔    | ✔     |         |
| GetRegion                      |       |           |      |       | ✔       |
| GetRegions                     |       |           |      |       | ✔       |
| GetReplicationStatus           | ✔     |           | ✔    | ✔     |         |
| GetRequestStatus               |       |           |      |       | ✔       |
| GetRequestStatuses             |       |           |      |       |         |
| GetRequestStatusesForNamespace |       |           |      |       | ✔       |
| GetRequestStatusesForUser      |       |           |      |       | ✔       |
| GetRoles                       |       |           |      |       | ✔       |
| GetRolesByPermissions          |       |           |      |       | ✔       |
| GetServiceAccount              |       |           |      |       | ✔       |
| GetServiceAccounts             |       |           |      |       | ✔       |
| GetUser                        |       |           |      |       | ✔       |
| GetUsers                       |       |           |      |       | ✔       |
| GetUsersForNamespace           | ✔     |           | ✔    | ✔     |         |
| GetUsersWithAccountRoles       |       |           |      |       | ✔       |
| GlobalizeNamespace             | ✔     |           |      |       |         |
| InviteUsers                    |       |           |      |       |         |
| ListCreditLedgerEntries        |       |           |      |       |         |
| ListExportSinks                | ✔     |           | ✔    | ✔     |         |
| ListFailoverHistoryByNamespace | ✔     |           | ✔    | ✔     |         |
| ListGrants                     |       |           |      |       |         |
| ListNamespaces                 |       |           |      |       | ✔       |
| ListReplicaStatus              | ✔     |           | ✔    | ✔     |         |
| RenameCustomSearchAttribute    | ✔     |           |      | ✔     |         |
| ResendUserInvite               |       |           |      |       |         |
| SetAccountSettings             |       |           |      |       |         |
| SetUserNamespaceAccess         | ✔     |           |      |       |         |
| SyncCurrentUserInvite          |       |           |      |       | ✔       |
| UpdateAccount                  |       |           |      |       |         |
| UpdateAPIKey                   |       |           |      |       | ✔       |
| UpdateExportSink               | ✔     |           |      | ✔     |         |
| UpdateNamespace                | ✔     |           |      | ✔     |         |
| UpdateServiceAccount           |       |           |      |       |         |
| UpdateUser                     |       |           |      |       |         |
| UpdateUserNamespacePermissions | ✔     |           |      |       |         |
| ValidateExportSink             | ✔     |           |      | ✔     |         |
| ValidateGlobalizeNamespace     | ✔     |           |      |       |         |

### Temporal Server APIs

| Permission                         | Admin | Developer | Read | Write | Account |
| ---------------------------------- | ----- | --------- | ---- | ----- | ------- |
| CountWorkflowExecutions            | ✔     |           | ✔    | ✔     |         |
| CreateSchedule                     | ✔     |           |      | ✔     |         |
| DeleteSchedule                     | ✔     |           |      | ✔     |         |
| DescribeBatchOperation             | ✔     |           | ✔    | ✔     |         |
| DescribeNamespace                  | ✔     |           | ✔    | ✔     |         |
| DescribeSchedule                   | ✔     |           | ✔    | ✔     |         |
| DescribeTaskQueue                  | ✔     |           | ✔    | ✔     |         |
| DescribeWorkflowExecution          | ✔     |           | ✔    | ✔     |         |
| GetSearchAttributes                | ✔     |           | ✔    | ✔     |         |
| GetWorkerBuildIdCompatibility      | ✔     |           | ✔    | ✔     |         |
| GetWorkerTaskReachability          | ✔     |           | ✔    | ✔     |         |
| GetWorkflowExecutionHistory        | ✔     |           | ✔    | ✔     |         |
| GetWorkflowExecutionHistoryReverse | ✔     |           | ✔    | ✔     |         |
| ListBatchOperations                | ✔     |           | ✔    | ✔     |         |
| ListClosedWorkflowExecutions       | ✔     |           | ✔    | ✔     |         |
| ListOpenWorkflowExecutions         | ✔     |           | ✔    | ✔     |         |
| ListScheduleMatchingTimes          | ✔     |           | ✔    | ✔     |         |
| ListSchedules                      | ✔     |           | ✔    | ✔     |         |
| ListTaskQueuePartitions            | ✔     |           | ✔    | ✔     |         |
| ListWorkflowExecutions             | ✔     |           | ✔    | ✔     |         |
| PatchSchedule                      | ✔     |           |      | ✔     |         |
| PollActivityTaskQueue              | ✔     |           |      | ✔     |         |
| PollWorkflowTaskQueue              | ✔     |           |      | ✔     |         |
| QueryWorkflow                      | ✔     |           | ✔    | ✔     |         |
| RecordActivityTaskHeartbeat        | ✔     |           |      | ✔     |         |
| RecordActivityTaskHeartbeatById    | ✔     |           |      | ✔     |         |
| RequestCancelWorkflowExecution     | ✔     |           |      | ✔     |         |
| ResetStickyTaskQueue               | ✔     |           |      | ✔     |         |
| ResetWorkflowExecution             | ✔     |           |      | ✔     |         |
| RespondActivityTaskCanceled        | ✔     |           |      | ✔     |         |
| RespondActivityTaskCanceledById    | ✔     |           |      | ✔     |         |
| RespondActivityTaskCompleted       | ✔     |           |      | ✔     |         |
| RespondActivityTaskCompletedById   | ✔     |           |      | ✔     |         |
| RespondActivityTaskFailed          | ✔     |           |      | ✔     |         |
| RespondActivityTaskFailedById      | ✔     |           |      | ✔     |         |
| RespondQueryTaskCompleted          | ✔     |           |      | ✔     |         |
| RespondWorkflowTaskCompleted       | ✔     |           |      | ✔     |         |
| RespondWorkflowTaskFailed          | ✔     |           |      | ✔     |         |
| SignalWithStartWorkflowExecution   | ✔     |           |      | ✔     |         |
| SignalWorkflowExecution            | ✔     |           |      | ✔     |         |
| StartBatchOperation                | ✔     |           |      | ✔     |         |
| StartWorkflowExecution             | ✔     |           |      | ✔     |         |
| StopBatchOperation                 | ✔     |           |      | ✔     |         |
| TerminateWorkflowExecution         | ✔     |           |      | ✔     |         |
| UpdateSchedule                     | ✔     |           |      | ✔     |         |
