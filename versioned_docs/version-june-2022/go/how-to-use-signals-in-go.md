---
id: how-to-use-signals-in-go
title: How to use Signals in Go
sidebar_label: Signals
description: Use the `SignalWorkflow()` method on and instance of the Go SDK Temporal Client to send a Signal to a Workflow Execution.
tags:
  - go
  - developer-guide
---

To use Signals in Go, first define your Signal type and then add a Signal handler to your Workflow Definition.
Signals can then be sent via the Temporal Client or from within a Workflow.

### Define Signal type

import DefineSignal from './how-to-define-a-signal-in-go.md'

<DefineSignal/>

### Handle Signal

import HandleSignal from './how-to-handle-a-signal-in-go.md'

<HandleSignal/>

### Send Signal from Temporal Client

import SendSignalClient from './how-to-send-a-signal-from-a-client-in-go.md'

<SendSignalClient/>

### Send Signal from within a Workflow

import SendSignalWorkflow from './how-to-send-a-signal-from-a-workflow-in-go.md'

<SendSignalWorkflow/>

### Signal-With-Start

import SignalWithStart from './how-to-send-a-signal-with-start-in-go.md'

<SignalWithStart/>
