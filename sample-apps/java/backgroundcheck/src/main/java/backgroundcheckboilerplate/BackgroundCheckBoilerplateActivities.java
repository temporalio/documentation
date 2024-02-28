/* dacx */
package backgroundcheckboilerplate;

import io.temporal.activity.ActivityInterface;

/*
The `BackgroundCheckActivity` interface below is an example of a the first part defining an Activity
*/

// Activity Interfaces must be annotated with @ActivityInterface
@ActivityInterface
// BackgroundCheckActivities is the interface that contains your Activity Definitions
public interface BackgroundCheckBoilerplateActivities {

  // ssnTraceActivity is your custom Activity Definition
  public String ssnTraceActivity(String socialSecurityNumber);

}

/* 
To designate an interface as a Activity, annotate the interface declaration
with `@ActivityInterface`. Then designate a method within the interface
as the Activity Method by annotating its method signature with `@ActivityMethod`.
The Activity Method is the method that will be invoked when executing a specificy
Activity. There can multiple Activity Methods per Activity Definition.
*/

/* @dacx
id: backgroundcheck-boilerplate-activity-interface
title: Boilerplate Activity Interface
label: Activity code
description: In the Temporal Java SDK, an Activity Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- activity  
- code sample
lines: 4-18
@dacx */

/* @dacx 
id: backgroundcheck-boilerplate-activity-interface-details
title: Boilerplate Activity Interface Details
label: Activity code
description: In the Temporal Java SDK, an Activity Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- activity
lines: 20-26
@dacx */