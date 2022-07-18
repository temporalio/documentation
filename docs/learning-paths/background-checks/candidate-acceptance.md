---
id: candidate-acceptance
title: What does the Candidate Acceptance Workflow Definition look like?
sidebar_label: Candidate Acceptance
description: The Candidate Acceptance Workflow sends email to the Candidate via an Activity Execution and waits on a Signal.
---

<!--SNIPSTART background-checks-accept-workflow-definition-->
[workflows/accept.go](https://github.com/temporalio/background-checks/blob/master/workflows/accept.go)
```go
func Accept(ctx workflow.Context, input *AcceptWorkflowInput) (*AcceptWorkflowResult, error) {
	err := emailCandidate(ctx, input)
	if err != nil {
		return &AcceptWorkflowResult{}, err
	}

	submission, err := waitForSubmission(ctx)

	result := AcceptWorkflowResult(*submission)
	return &result, err
}

```
<!--SNIPEND-->

![Swim lane diagram of the Candidate Acceptance Child Workflow Execution](/diagrams/background-checks/candidate-accept-flow.svg)
