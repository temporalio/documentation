/* dacx */
package backgroundcheckboilerplate;

import io.temporal.activity.ActivityOptions;
import io.temporal.workflow.Workflow;

import java.time.Duration;

/*
Now that you've defined your Workflow Interface you can define its implementation.
*/

public class BackgroundCheckBoilerplateWorkflowImpl implements BackgroundCheckBoilerplateWorkflow {

  // Define the Activity Execution options
  // StartToCloseTimeout or ScheduleToCloseTimeout must be set
  ActivityOptions options = ActivityOptions.newBuilder()
          .setStartToCloseTimeout(Duration.ofSeconds(5))
          .build();

  // Create an client stub to activities that implement the given interface
  private final BackgroundCheckBoilerplateActivities activities =
      Workflow.newActivityStub(BackgroundCheckBoilerplateActivities.class, options);

  @Override
  public String backgroundCheck(String socialSecurityNumber) {
    String ssnTraceResult = activities.ssnTraceActivity(socialSecurityNumber);
    return ssnTraceResult;
  }

}

/*
You define your Workflow Implementation by defining a class that `implements` the
Workflow Interface.

To have a Workflow call Activities, you'll instantiate an object representing
those Activities. There are various options that can be passed in during creation
time, but Temporal requires that you set _either_ `StartToCloseTimeout` or `ScheduleToCloseTimeout`
when creating your Activities stub. You can read more about these options [in our documentation](/encyclopedia/detecting-activity-failures#start-to-close-timeout)

As with regular Java methods, Workflow Methods support the passing of parameters.
However, all Workflow Definition parameters must be serializable (using the Jackson JSON 
Payload Converter).

To request the execution of an Activity, also referred to as an [Activity Execution](/concepts/what-is-an-activity-execution), 
call the Activity Method from within the Workflow Method. Use the `activities`
object that was created in the Workflow Definition to call the Activity Method 
along with the any parameters that need to be passed. 

A Java-based Workflow Definition can return any serializable output, or raise an 
exception if one was encountered.
We get into the best practices around Workflow parameters, return values, and 
exceptions in the one of the next sections.

In regards to code organization, we recommend organizing Workflow code the same
way you'd organize your standard Java code. 
*/

/* @dacx
id: backgroundcheck-boilerplate-workflow-implementation
title: Boilerplate Workflow Implementation
label: Workflow code
description: In the Temporal Java SDK, a Workflow Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- workflow
- code sample
lines: 4-31
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-workflow-details
title: Boilerplate Workflow Implementation
label: Workflow code
description: In the Temporal Java SDK, a Workflow Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- workflow
lines: 33-58
@dacx */
