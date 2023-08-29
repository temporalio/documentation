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

| Feature                                 | Go  | Java | TS  | Python | .Net | PHP | Ruby | Notes                                                      | Category   | Tags | Group      |
| --------------------------------------- | --- | ---- | --- | ------ | ---- | --- | ---- | ---------------------------------------------------------- | ---------- | ---- | ---------- |
| Activities                              | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Core       |      | Workflows  |
| Timers                                  | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Core       |      | Workflows  |
| Cancellation                            | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   | docs: php                                                  | Core       |      | Workflows  |
| Queries                                 | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Core       |      | Workflows  |
| Signals                                 | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Core       |      | Workflows  |
| Retries                                 | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Core       |      | Workflows  |
| Heartbeats                              | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Production |      | Activities |
| SDK Metrics                             | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            | Production |      | Worker     |
| User Metrics                            | Yes | Yes  | Yes | No     | No   | No  | No   |                                                            | Production |      | Worker     |
| Continue as New                         | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Production |      | Workflows  |
| Versioning / Patching                   | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Production |      | Workflows  |
| Search Attributes                       | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   | php needs docs                                             | Production |      | Workflows  |
| Unit testing                            | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Production |      | Testing    |
| Auth (SSL/mTLS)                         | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   | php needs docs createAddress                               | Production |      | Client     |
| Child Workflows                         | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Production |      | Workflows  |
| Interceptors                            | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            | Advanced   |      | Workflows  |
| Local Activities                        | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Advanced   |      | Workflows  |
| Signal/Cancel External WF               | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   | php docs                                                   | Advanced   |      | Workflows  |
| Failure propagation                     | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   |                                                            | Advanced   |      | Workflows  |
| Sessions                                | Yes | No   | No  | No     | No   | No  | No   | Want to generally revisit before rolling out to other SDKs | Advanced   |      | Workflows  |
| Side Effects                            | Yes | Yes  | No  | No     | No   | Yes | No   |                                                            | Advanced   |      | Workflows  |
| Sticky Execution                        | Yes | Yes  | Yes | Yes    | Yes  | Yes | No   | php: not at runtime                                        | Advanced   |      | Workflows  |
| Test Host                               | No  | No   | Yes | Yes    | Yes  | Yes | No   |                                                            | Platform   |      | Testing    |
| Sandbox                                 | No  | No   | Yes | Yes    | No   | No  | No   |                                                            |            |      | Workflows  |
| Static analyzer                         | Yes | No   | No  | No     | No   | No  | No   |                                                            |            |      | Workflows  |
| Schedules                               | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Client     |
| Upsert memo                             | Yes | No   | No  | No     | Yes  | No  | No   |                                                            |            |      | Workflows  |
| High level list workflow API            | No  | No   | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Client     |
| Separate codec concept                  | Yes | Yes  | Yes | Yes    | Yes  | No  | No   | Not cleanly separated in Java and Go                       |            |      | Common     |
| Failure encoding                        | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Workflows  |
| Remote codec                            | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Common     |
| Replayer                                | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Tooling    |
| Bulk replayer                           | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Tooling    |
| Build ID based dispatch                 | Yes | Yes  | No  | Yes    | Yes  | No  | No   |                                                            |            |      | Workflows  |
| Synchronous update                      | Yes | Yes  | No  | No     | No   | No  | No   |                                                            |            |      | Workflows  |
| Operator service                        | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Client     |
| Health service                          | Yes | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      | Client     |
| gRPC interceptors                       | Yes | Yes  | Yes | No     | No   | No  | No   | TS: Not if you want to intercept poll calls                |            |      | Client     |
| Enhanced stack trace                    | No  | No   | Yes | No     | No   | No  | No   |                                                            |            |      | Workflows  |
| Built-in handler list query             | No  | No   | No  | No     | No   | No  | No   |                                                            |            |      | Workflows  |
| SAGA                                    | No  | Yes  | No  | No     | No   | Yes | No   |                                                            |            |      | Workflows  |
| Dynamic Activities                      | No  | Yes  | No  | Yes    | Yes  | No  | No   |                                                            |            |      | Activities |
| Dynamic Workflows                       | No  | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      |            |
| Dynamic Signals                         | No  | Yes  | Yes | Yes    | Yes  | No  | No   |                                                            |            |      |            |
| Dynamic Queries                         | No  | Yes  | No  | Yes    | Yes  | No  | No   |                                                            |            |      |            |
| VSCode extension support                | No  | No   | Yes | No     | No   | No  | No   |                                                            |            |      | Tooling    |
| Built-in Temporal CLI dev server runner | Yes | No   | Yes | Yes    | Yes  | No  | No   |                                                            |            |      |            |
| Typed search attributes                 | No  | Yes  | No  | No     | Yes  | No  | No   |                                                            |            |      |            |
