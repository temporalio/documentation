---
id: how-to-use-signals-in-java
title: How to use Signals in Java
sidebar_label: Signals
description: To use Signals in Java, initiate the Signal method with `@SignalMethod` annotation in the Workflow interface and call the Signal method either directly from the Client or from within another Workflow.
tags:
  - java
  - developer-guide
---

To use Signals in Java, initiate the Signal method with `@SignalMethod` annotation in the Workflow interface and call the Signal method either directly from the Client or use `ExternalWorkflowStub` to call the Signal method from within another Workflow.

### Define Signal Method

import  DefineSignal from './how-to-define-a-signal-in-java.md'

<DefineSignal/>

### Handle Signal

import HandleSignal from './how-to-handle-a-signal-in-a-workflow-in-java.md'

<HandleSignal/>

### Send Signal from Temporal Client

import SendSignalClient from './how-to-send-a-signal-from-a-client-in-java.md'

<SendSignalClient/>

### Send Signal from within a Workflow

import SendSignalWorkflow from './how-to-send-a-signal-from-a-workflow-in-java.md'

<SendSignalWorkflow/>

### Signal-With-Start

import SignalWithStart from './how-to-send-a-signal-with-start-in-java.md'

<SignalWithStart/>
