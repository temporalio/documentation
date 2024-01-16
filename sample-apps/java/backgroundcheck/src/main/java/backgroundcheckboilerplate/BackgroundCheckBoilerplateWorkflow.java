/* dacx */
package backgroundcheckboilerplate;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

/*
The `BackgroundCheckBoilerplateWorkflow` interface below is an example of a the first part of a Workflow Definition.
*/

// Workflow Interfaces must be annotated with @WorkflowInterface
@WorkflowInterface
public interface BackgroundCheckBoilerplateWorkflow {

  // The Workflow Method within the interface must be annotated with @WorkflowMethod
  @WorkflowMethod
  public String backgroundCheck(String socialSecurityNumber);

}

/* 
To designate an interface as a Workflow, annotate the interface declaration
with `@WorkflowInterface`. Then designate a method within the interface
as the Workflow Method by annotating its method signature with `@WorkflowMethod`.
The Workflow Method is the method that will be invoked when executing a Workflow.
There can only be one Workflow Method per Workflow Definition.
*/

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
lines: 4-20
@dacx */

/* @dacx 
id: backgroundcheck-boilerplate-workflow-interface-details
title: Boilerplate Workflow Interface Details
label: Workflow code
description: In the Temporal Java SDK, a Workflow Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- workflow
lines: 21-27
@dacx */