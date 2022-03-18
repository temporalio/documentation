---
id: main-background-check
title: What does the main Background Check Workflow Definition look like?
sidebar_label: Main Background Check
description: This is the entry point of the Temporal Application.
---

This is the entry point of the Temporal Application.
When a new Background Check is started, this is the function that executes.

<!--SNIPSTART background-checks-main-workflow-definition-->
[workflows/background_check.go](https://github.com/temporalio/background-checks/blob/master/workflows/background_check.go)
```go

// BackgroundCheck is a Workflow Definition that calls for the execution of a variable set of Activities and Child Workflows.
// This is the main entry point of the application.
// It accepts an email address as the input.
// All other personal information for the Candidate is provided when they accept the Background Check.
func BackgroundCheck(ctx workflow.Context, input *BackgroundCheckWorkflowInput) (*BackgroundCheckWorkflowResult, error) {
	w := newBackgroundCheckWorkflow(
		ctx,
		&BackgroundCheckState{
			Email:         input.Email,
			Tier:          input.Tier,
			SearchResults: make(map[string]interface{}),
			SearchErrors:  make(map[string]string),
		},
	)

	// The query returns the status of a background check and is used by the API to build the report at the end.
	err := workflow.SetQueryHandler(ctx, BackgroundCheckStatusQuery, func() (BackgroundCheckState, error) {
		return w.BackgroundCheckState, nil
	})
	if err != nil {
		return &w.BackgroundCheckState, err
	}

	// Send the candidate an email asking them to accept or decline the background check.
	response, err := w.waitForAccept(ctx, w.Email)
	if err != nil {
		return &w.BackgroundCheckState, err
	}

	w.Accepted = response.Accepted

	// If the candidate declined the check, let the hiring manager know and then end the workflow.
	if !w.Accepted {
		return &w.BackgroundCheckState, w.sendDeclineEmail(ctx, activities.HiringManagerEmail)
	}

	w.CandidateDetails = response.CandidateDetails

	// Update our status search attribute. This is used by our API to filter the background check list if requested.
	err = w.pushStatus(ctx, "running")
	if err != nil {
		return &w.BackgroundCheckState, err
	}

	// Run an SSN trace on the SSN the candidate provided when accepting the background check.
	w.SSNTrace, err = w.ssnTrace(ctx)
	if err != nil {
		return &w.BackgroundCheckState, err
	}

	// If the SSN the candidate gave us was not valid then send a report email to the Hiring Manager and end the workflow.
	// In this case all the searches are skipped.
	if !w.SSNTrace.SSNIsValid {
		return &w.BackgroundCheckState, w.sendReportEmail(ctx, activities.HiringManagerEmail)
	}

	// Start the main searches, these are run in parallel as they do not depend on each other.

	var primaryAddress string
	if len(w.SSNTrace.KnownAddresses) > 0 {
		primaryAddress = w.SSNTrace.KnownAddresses[0]
	}

	// We always run the FederalCriminalSearch
	w.startSearch(
		ctx,
		"FederalCriminalSearch",
		FederalCriminalSearch,
		FederalCriminalSearchWorkflowInput{FullName: w.CandidateDetails.FullName, KnownAddresses: w.SSNTrace.KnownAddresses},
	)

	// If the background check is on the full tier we run more searches
	if w.Tier == "full" {
		w.startSearch(
			ctx,
			"StateCriminalSearch",
			StateCriminalSearch,
			StateCriminalSearchWorkflowInput{FullName: w.CandidateDetails.FullName, KnownAddresses: w.SSNTrace.KnownAddresses},
		)
		w.startSearch(
			ctx,
			"MotorVehicleIncidentSearch",
			MotorVehicleIncidentSearch,
			MotorVehicleIncidentSearchWorkflowInput{FullName: w.CandidateDetails.FullName, Address: primaryAddress},
		)

		// Verify their employment if they provided an employer
		if w.CandidateDetails.Employer != "" {
			w.startSearch(
				ctx,
				"EmploymentVerification",
				EmploymentVerification,
				EmploymentVerificationWorkflowInput{CandidateDetails: w.CandidateDetails},
			)
		}
	}

	// Wait for all of our searches to complete.
	w.waitForSearches(ctx)

	// Send the report email to the Hiring Manager.
	return &w.BackgroundCheckState, w.sendReportEmail(ctx, activities.HiringManagerEmail)
}

```
<!--SNIPEND-->

The sequence that the code defines can be represented in the following diagram:

![Swim lane diagram of the Main Background Check Workflow Execution](/diagrams/background-checks/main-background-check.svg)
