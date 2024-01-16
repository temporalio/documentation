/* dacx */
package backgroundcheckreplay;

import io.temporal.activity.ActivityInterface;

/*
The `BackgroundCheckActivity` interface below is an example of a the first part defining an Activity
*/

// Activity Interfaces must be annotated with @ActivityInterface
@ActivityInterface
// BackgroundCheckActivities is the interface that contains your Activity Definitions
public interface BackgroundCheckReplayActivities {

  // ssnTraceActivity is your custom Activity Definition
  public String ssnTraceActivity(String socialSecurityNumber);

}