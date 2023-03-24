---
id: how-to-send-a-signal-from-a-workflow-in-java
title: How to send a Signal from a Workflow in Java
sidebar_label: Send Signal from Workflow
description: To send a Signal from within a Workflow to a different Workflow Execution, initiate an `ExternalWorkflowStub` in the implementation of the current Workflow and call the Signal method defined in the other Workflow.
tags:
  - java
  - developer-guide
---

To send a Signal from within a Workflow to a different Workflow Execution, initiate an `ExternalWorkflowStub` in the implementation of the current Workflow and call the Signal method defined in the other Workflow.

The following example shows how to use an untyped `ExternalWorkflowStub` in the Workflow implementation to send a Signal to another Workflow.

```java
    public String sendGreeting(String name) {

        // initiate ExternalWorkflowStub to call another Workflow by its Id "ReplyWF"
        ExternalWorkflowStub callRespondWorkflow = Workflow.newUntypedExternalWorkflowStub("ReplyWF");

        String responseTrigger = activity.greeting("Hello", name);

        // send a Signal from this sendGreeting Workflow to the other Workflow
        // by calling the Signal method name "getGreetCall" defined in that Workflow.
        callRespondWorkflow.signal("getGreetCall", responseTrigger);

        return responseTrigger;
```
