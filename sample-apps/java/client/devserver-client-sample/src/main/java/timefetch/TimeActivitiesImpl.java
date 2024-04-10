package timefetch;

import nistclient.TimeNistClient;
import io.temporal.activity.Activity;

public class TimeActivitiesImpl implements TimeActivities {
    @Override
    public String getTime() {
        String result = null;
        try {
            result = TimeNistClient.getTime();
        } catch (Exception e) {
            throw Activity.wrap(e);
        }
        return result;
    }
}
