---
id: compare-sdks
title: What are the differences in each SDK?
description: A comparison of the features available in each SDK.
sidebar_label: SDK Comparison
tags:
  - term
  - explanation
---

The following table compares the features available in each SDK.


| Feature                                 | Go  | Java | TypeScript | Python | .Net | PHP | Category   | Group      |
| --------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- | ---------- | ---------- |
| Activities                              | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Timers                                  | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Cancellation                            | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Queries                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Signals                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Retries                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Core       | Workflows  |
| Heartbeats                              | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Activities |
| SDK Metrics                             | Yes | Yes  | Yes        | Yes    | Yes  | No  | Production | Worker     |
| User Metrics                            | Yes | Yes  | Yes        | No     | No   | No  | Production | Worker     |
| Continue as New                         | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Workflows  |
| Versioning / Patching                   | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Workflows  |
| Search Attributes                       | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Workflows  |
| Unit testing                            | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Testing    |
| Auth (SSL/mTLS)                         | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Client     |
| Child Workflows                         | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Production | Workflows  |
| Interceptors                            | Yes | Yes  | Yes        | Yes    | Yes  | No  | Advanced   | Workflows  |
| Local Activities                        | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Advanced   | Workflows  |
| Signal/Cancel External WF               | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Advanced   | Workflows  |
| Failure propagation                     | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Advanced   | Workflows  |
| Sessions                                | Yes | No   | No         | No     | No   | No  | Advanced   | Workflows  |
| Side Effects                            | Yes | Yes  | No         | No     | No   | Yes | Advanced   | Workflows  |
| Sticky Execution                        | Yes | Yes  | Yes        | Yes    | Yes  | Yes | Advanced   | Workflows  |
| Test Host                               | No  | No   | Yes        | Yes    | Yes  | Yes | Platform   | Testing    |
| Sandbox                                 | No  | No   | Yes        | Yes    | No   | No  |            | Workflows  |
| Static analyzer                         | Yes | No   | No         | No     | No   | No  |            | Workflows  |
| Schedules                               | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Client     |
| Upsert memo                             | Yes | No   | No         | No     | Yes  | No  |            | Workflows  |
| High level list workflow API            | No  | No   | Yes        | Yes    | Yes  | No  |            | Client     |
| Separate codec concept                  | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Common     |
| Failure encoding                        | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Workflows  |
| Remote codec                            | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Common     |
| Replayer                                | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Tooling    |
| Bulk replayer                           | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Tooling    |
| Build ID based dispatch                 | Yes | Yes  | No         | Yes    | Yes  | No  |            | Workflows  |
| Synchronous update                      | Yes | Yes  | No         | No     | No   | No  |            | Workflows  |
| Operator service                        | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Client     |
| Health service                          | Yes | Yes  | Yes        | Yes    | Yes  | No  |            | Client     |
| gRPC interceptors                       | Yes | Yes  | Yes        | No     | No   | No  |            | Client     |
| Enhanced stack trace                    | No  | No   | Yes        | No     | No   | No  |            | Workflows  |
| Built-in handler list query             | No  | No   | No         | No     | No   | No  |            | Workflows  |
| SAGA                                    | No  | Yes  | No         | No     | No   | Yes |            | Workflows  |
| Dynamic Activities                      | No  | Yes  | No         | Yes    | Yes  | No  |            | Activities |
| Dynamic Workflows                       | No  | Yes  | Yes        | Yes    | Yes  | No  |            |            |
| Dynamic Signals                         | No  | Yes  | Yes        | Yes    | Yes  | No  |            |            |
| Dynamic Queries                         | No  | Yes  | No         | Yes    | Yes  | No  |            |            |
| VSCode extension support                | No  | No   | Yes        | No     | No   |     |            |            |
| No                                      | No  | Yes  | No         | No     | No   | No  |            | Tooling    |
| Built-in Temporal CLI dev server runner | Yes | No   | Yes        | Yes    | Yes  | No  |            |            |
