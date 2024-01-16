package cloud

import (
	"context"
	"time"

	"go.temporal.io/sdk/workflow"
)

// SomeData is the object returned by the Workflow.
type SomeData struct {
	X string
}

// YourWorkflow is a simple Workflow Defintion.
func YourWorkflow(ctx workflow.Context) (*SomeData, error) {
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	var a *ActivityStruct
	var activityResult *SomeData
	err := workflow.ExecuteActivity(ctx, a.GetData).Get(ctx, &activityResult)
	if err != nil {
		return &SomeData{}, err
	}
	return activityResult, nil
}

// ActivityStruct provides access to common data
// There is no common data in this example
type ActivityStruct struct{}

// YourActivity is a simple Activity Definiton.
func (a *ActivityStruct) GetData(ctx context.Context) (*SomeData, error) {
	return &SomeData{X: "Hello World!"}, nil
}
