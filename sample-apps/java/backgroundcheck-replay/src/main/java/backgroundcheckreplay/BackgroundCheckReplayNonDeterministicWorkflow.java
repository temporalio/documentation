/* dacx */
package backgroundcheckreplay;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;


// BackgroundCheckReplayWorkflowNonDeterministic is an anti-pattern Workflow Definition
@WorkflowInterface
public interface BackgroundCheckReplayNonDeterministicWorkflow {

  // The Workflow Method within the interface must be annotated with @WorkflowMethod
  @WorkflowMethod
  public String backgroundCheck(String socialSecurityNumber);

}


/* @dacx
id: backgroundcheck-boilerplate-workflow-interface
title: Boilerplate Workflow Interface
label: Workflow code
description: In the Temporal Java SDK, a Workflow Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- workflow
- code sample
lines: 4-16
@dacx */