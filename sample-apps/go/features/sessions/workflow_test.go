package sessions

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"go.temporal.io/sdk/worker"

	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"
)

type UnitTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(UnitTestSuite))
}

// Test_SomeFileProcessingWorkflow is a function to test the Workflow.
func (s *UnitTestSuite) Test_SomeFileProcessingWorkflow() {
	env := s.NewTestWorkflowEnvironment()
	env.SetWorkerOptions(worker.Options{
		EnableSessionWorker: true,
	})
	var a *FileActivities

	testWFParam := FileProcessingWFParam{
		CloudFileLocation: "https://example.com/path/to/file",
	}
	testResult := FileActivityResult {
		FileName: "test_filename",
	}
	activityParam := FileActivityParam {
		FileName: "test_filename",
	}
	env.OnActivity(a.DownloadFile, mock.Anything, testWFParam).Return(testResult, nil)
	env.OnActivity(a.ProcessFile, mock.Anything, activityParam).Return(testResult, nil)
	env.OnActivity(a.UploadFile, mock.Anything, activityParam).Return(nil)
	env.RegisterActivity(a)
	env.ExecuteWorkflow(SomeFileProcessingWorkflow, testWFParam)

	s.True(env.IsWorkflowCompleted())
	s.NoError(env.GetWorkflowError())

	env.AssertExpectations(s.T())
}
