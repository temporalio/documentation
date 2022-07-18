---
id: employment-verification
title: What does the Employment Verification Workflow Definition look like?
sidebar_label: Employment Verification
description: The Employment Verification Workflow sends email to a Researcher via an Activity Execution and waits on a Signal.
---

<!--SNIPSTART background-checks-employment-verification-workflow-definition-->
[workflows/employment_verification.go](https://github.com/temporalio/background-checks/blob/master/workflows/employment_verification.go)
```go

// EmploymentVerification is a Workflow Definition that calls for the execution of a Side Effect, and an Activity,
// but then waits on and handles a Signal. It is also capable of handling a Query to get Candidate Details.
// This is executed as a Child Workflow by the main Background Check.
func EmploymentVerification(ctx workflow.Context, input *EmploymentVerificationWorkflowInput) (*EmploymentVerificationWorkflowResult, error) {
	var result EmploymentVerificationWorkflowResult

	err := workflow.SetQueryHandler(ctx, EmploymentVerificationDetailsQuery, func() (CandidateDetails, error) {
		return input.CandidateDetails, nil
	})
	if err != nil {
		return &result, err
	}

	researcher, err := chooseResearcher(ctx, input)
	if err != nil {
		return &result, err
	}

	err = emailEmploymentVerificationRequest(ctx, input, researcher)
	if err != nil {
		return &result, err
	}
	submission, err := waitForEmploymentVerificationSubmission(ctx)

	result = EmploymentVerificationWorkflowResult(*submission)
	return &result, err
}

```
<!--SNIPEND-->

![Swim lane diagram of the Employment Verification Child Workflow Execution](/diagrams/background-checks/employment-verification-flow.svg)
