/* dacx */
package backgroundcheckboilerplate;

/*
Now that you've defined your Activity Interface you can define its implementation.
*/

public class BackgroundCheckBoilerplateActivitiesImpl implements BackgroundCheckBoilerplateActivities{

  @Override
  public String ssnTraceActivity(String socialSecurityNumber){
    
    // This is where a call to another service would be made to perform the trace
    // We are simulating that the service that does SSNTrace executed successfully
    // with a passing value being returned

    String result = "pass";
    return result;
  }

}

/*
You define your Activity Implementation by defining a class that `implements` the
Activity Interface.

As with regular Java methods, Activity Methods support the passing of parameters.
However, all Activity parameters must be serializable (using the Jackson JSON 
Payload Converter).

A Java-based Activity Definition can return any serializable output, or raise an 
exception if one was encountered.
We get into the best practices around Activity parameters, return values, and 
exceptions in the one of the next sections.

In regards to code organization, we recommend organizing Activity code the same
way you'd organize your standard Java code. 
*/

/* @dacx
id: backgroundcheck-boilerplate-activity-implementation
title: Boilerplate Activity Implementation
label: Activity code
description: In the Temporal Java SDK, an Activity Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- activity
- code sample
lines: 4-21
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-activity-implementation-details
title: Boilerplate Activity Implementation
label: Activity code
description: In the Temporal Java SDK, an Activity Definition is an interface and its implementation.
tags:
- java sdk
- developer guide
- activity
lines: 23-38
@dacx */


