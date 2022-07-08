An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
Each Heartbeat informs the Temporal Cluster that the Activity Execution is making progress and the Worker has not crashed.
If the Cluster does not receive a Heartbeat within a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout) time period, the Activity will be considered failed and another [Activity Task Execution](/concepts/what-is-an-activity-task-execution) may be scheduled according to the Retry Policy.

Heartbeats may not always be sent to the Cluster—they may be throttled by the Worker.
The throttle interval is the smaller of:

- `if heartbeatTimeout is provided, heartbeatTimeout * 0.8; else defaultHeartbeatThrottleInterval`
- `maxHeartbeatThrottleInterval`

`defaultHeartbeatThrottleInterval` is 30 seconds by default, and `maxHeartbeatThrottleInterval` is 60 seconds by default.
Each can be set in Worker options.

Throttling is implemented as follows:

- After sending a Heartbeat, the Worker sets a timer for the throttle interval.
- The Worker stops sending Heartbeats, but continues receiving Heartbeats from the Activity and remembers the most recent one.
- When the timer fires, the Worker:
  - Sends the most recent Heartbeat.
  - Sets the timer again.

Activity Cancellations are delivered to Activities from the Cluster when they Heartbeat. Activities that don't Heartbeat can't receive a Cancellation. Heartbeat throttling may lead to Cancellation getting delivered later than expected.

Heartbeats may contain a `details` field describing the Activity's current progress. If an Activity gets retried, the Activity can access the `details` from the last heartbeat that was sent to the Cluster.
