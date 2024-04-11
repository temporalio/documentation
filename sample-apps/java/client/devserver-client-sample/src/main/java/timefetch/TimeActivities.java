package timefetch;

import io.temporal.activity.Activity;
import io.temporal.activity.ActivityInterface;

@ActivityInterface
public interface TimeActivities {
    public String getTime();
}
