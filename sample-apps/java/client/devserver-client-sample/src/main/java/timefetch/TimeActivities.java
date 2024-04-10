package timefetch;

import java.time.Duration;
import io.temporal.activity.Activity;
import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityOptions;
import io.temporal.common.RetryOptions;

@ActivityInterface
public interface TimeActivities {
    public String getTime();
    // Calls closer together than 4 seconds will be considered
    // a possible denial of service attack. Set initial interval
    // to 5 seconds, and do not increase.
    public RetryOptions retryOptions = RetryOptions.newBuilder()
        .setInitialInterval(Duration.ofSeconds(5))
        .setBackoffCoefficient(1.0)
        .build();

    public ActivityOptions activityOptions = ActivityOptions
        .newBuilder()
        // Max Activity execution time
        .setStartToCloseTimeout(Duration.ofSeconds(60))
        // Entire duration from scheduling to completion, including queue time.
        .setScheduleToCloseTimeout(Duration.ofSeconds(90))
        .setRetryOptions(retryOptions)
        .build();
}
