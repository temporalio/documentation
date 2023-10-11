---
id: why-use-a-temporal-sdk
title: Why use a Temporal SDK?
description: Temporal SDKs empowers developers to concentrate on creating dependable and scalable business logic, alleviating the need to build home grown supervisor systems to ensure reliability and fault-tolerance.
sidebar_label: Why use an SDK
tags:
  - explanation
---

Temporal SDKs empowers developers to concentrate on creating dependable and scalable business logic, alleviating the need to build home grown supervisor systems to ensure reliability and fault-tolerance. This is possible because the Temporal SDK provides a unified library that abstracts the intricacies of how Temporal handles distributed systems.

### Development pattern

By abstracting complexities and streamlining boilerplate code, developers can craft straightforward code that directly aligns with their business logic, enhancing code readability and bolstering developer productivity.

Consider a bank loan application.
Developers can design the business logic of a bank loan using the Temporal SDK.
The Workflow defines the overarching business logic, encompassing tasks such as validating applicant information, credit checks, loan approval, and applicant notifications, as Activities.

:::caution Do not copy and use code

The following is psuedocode, for tested samples see your langauge SDK's developer's guide.

:::

```
func LoanApplicationWorkflow {

    sdk.ExecuteActivity(CreditCheck)

    sdk.ExecuteActivity(AutomatedApproval)

    sdk.ExecuteActivity(NotifyApplicant)

    // ...
}
```

For instance, Temporal SDKs have built-in support for handling failures, timeouts, and retries.
In the event of an Activity failure, the SDK automatically initiates retries according to configurable policies established by the developer within the SDK. This streamlined process simplifies the integration of fault-tolerance mechanisms into applications.

:::caution Do not copy and use code

The following is psuedocode, for tested samples see your langauge SDK's developer's guide.

:::

```
func LoanApplicationWorkflow {

    options = {
        MaxAttempts: 3,
        StartToCloseTimeout: 30min,
        HeartbeatTimeout: 10min,
    }

    sdk.ExecuteActivity(CreditCheck, options)

    sdk.ExecuteActivity(AutomatedApproval)

    sdk.ExecuteActivity(NotifyApplicant)

    // ...
}
```

### Replays

Another quality of the SDKs lies in their ability to replay Workflow Executions, a complex operation that contributes significantly to the Platform's promised reliability.

![The SDKs Replay code execution to continue from the last step](/diagrams/replay-basic.svg)

We will delve into this idea more later, but for now, it signifies that the SDKs can automatically continue a process from the point of interruption, should a failure occur.
This capability stems from the SDK's ability to persist each step the program takes.
