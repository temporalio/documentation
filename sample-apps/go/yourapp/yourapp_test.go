package yourapp

import (
	"testing"

	"github.com/stretchr/testify/mock"

	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
)

func Test_Workflow(t *testing.T) {
	testSuite := &testsuite.WorkflowTestSuite{}
	env := testSuite.NewTestWorkflowEnvironment()
	wfParam := YourWorkflowParam{ 
		WorkflowParamX: "Hello World!",
		WorkflowParamY: 100,
	}
	activityResult := YourActivityResultObject{
		ResultFieldX: "Message",
		ResultFieldY: 1,
	}
	var activities *YourActivityObject
	env.OnActivity(activities.YourActivityDefinition, mock.Anything, mock.Anything).Return(&activityResult, nil)
	env.OnActivity(activities.GetInfo, mock.Anything).Return(&activityResult, nil)
	env.OnActivity(activities.PrintInfo, mock.Anything, mock.Anything).Return(nil)
	env.ExecuteWorkflow(YourWorkflowDefinition, wfParam)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
	var result YourWorkflowResultObject
	require.NoError(t, env.GetWorkflowResult(&result))
}

func Test_Activity(t *testing.T) {
	testSuite := &testsuite.WorkflowTestSuite{}
	env := testSuite.NewTestActivityEnvironment()
	activityParam := YourActivityParam{
		ActivityParamX: "Message",
		ActivityParamY: 1,
	}
	var activities YourActivityObject
	message := "No messages!"
	counter := 0
	activities.Message = &message
	activities.Number = &counter
	env.RegisterActivity(activities.YourActivityDefinition)
	val, err := env.ExecuteActivity(activities.YourActivityDefinition, activityParam)
	require.NoError(t, err)
	var res YourActivityResultObject
	require.NoError(t, val.Get(&res))
	require.Equal(t, "Success", res.ResultFieldX)
}
