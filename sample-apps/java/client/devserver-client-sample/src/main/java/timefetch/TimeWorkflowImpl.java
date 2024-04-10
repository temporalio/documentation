package timefetch;

import io.temporal.workflow.Workflow;
import io.temporal.activity.ActivityOptions;

public class TimeWorkflowImpl implements TimeWorkflow {
    private TimeActivities activityStub = Workflow.newActivityStub(TimeActivities.class, TimeActivities.activityOptions);

    @Override
    public String getTime() {
        String results = activityStub.getTime();
        return results;
    }
}
