---
id: how-to-define-a-signal-to-a-workflow-execution-in-java
title: How to define Signals in Java
sidebar_label: Define Signal
description: Define a Signal method with `@SignalMethod` annotation in the Workflow interface and implement it in the Workflow implementation.
tags:
  - java
  - developer-guide
---

The `@SignalMethod` annotation indicates that the method is used to handle and react to external Signals.

```java
 @SignalMethod
    void mySignal(String signalName);
```

The method can have parameters that contain the Signal payload and must be serializable by the default Jackson JSON Payload Converter.

```java
void mySignal(String signalName, Object... args);
```

This method does not return a value and must have a `void` return type.

Things to consider when defining Signals:

- Use Workflow object constructors and initialization blocks to initialize the internal data structures if possible.
- Signals may be received by a Workflow before the Workflow method is executed. When implementing Signals in scenarios where this may occur, assume that no parts of Workflow code was run.
  In some cases, Signal method implementation may require some initialization to be performed by the Workflow method code first.
  For example, when the Signal processing depends on, and is defined by the Workflow input.
  In this case, you can use a flag to define if the Workflow method is already triggered and if not, persist the Signal data into a collection for delayed processing by the Workflow method.
