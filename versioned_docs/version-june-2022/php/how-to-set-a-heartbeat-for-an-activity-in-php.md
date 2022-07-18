---
id: how-to-set-a-heartbeat-for-an-activity-in-php
title: How to set a Heartbeat for an Activity in PHP
sidebar_label: Heartbeat an Activity
---

Some Activities are long-running.
To react to a crash quickly, use the Heartbeat mechanism, `Activity::heartbeat()`, which lets the Temporal Server know that the Activity is still alive.
This acts as a periodic checkpoint mechanism for the progress of an Activity.

You can piggyback `details` on an Activity Heartbeat.
If an Activity times out, the last value of `details` is included in the `TimeoutFailure` delivered to a Workflow.
Then the Workflow can pass the details to the next Activity invocation.
Additionally, you can access the details from within an Activity via `Activity::getHeartbeatDetails`.
When an Activity is retried after a failure `getHeartbeatDetails` enables you to get the value from the last successful Heartbeat.

```php
use Temporal\Activity;

class FileProcessingActivitiesImpl implements FileProcessingActivities
{
    // ...
    public function download(
        string $bucketName,
        string $remoteName,
        string $localName
    ): void
    {
        $this->dowloader->downloadWithProgress(
            $bucketName,
            $remoteName,
            $localName,
            // on progress
            function ($progress) {
                Activity::heartbeat($progress);
            }
        );

        Activity::heartbeat(100); // download complete

        // ...
    }

    // ...
}
```
