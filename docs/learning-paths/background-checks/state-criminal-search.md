---
id: state-criminal-search
title: What does the State Criminal Search Workflow Definition Look Like?
sidebar_label: State Criminal Search
description: The State Criminal Search Workflow calls an external API via an Activity Execution and returns the results.
---

<!--SNIPSTART background-checks-state-criminal-workflow-definition-->
[workflows/state_criminal_search.go](https://github.com/temporalio/background-checks/blob/master/workflows/state_criminal_search.go)
```go

// StateCriminalSearch is a Workflow Definition that calls for the execution an Activity for
// each address associated with the Candidate.
// This is executed as a Child Workflow by the main Background Check.
func StateCriminalSearch(ctx workflow.Context, input *StateCriminalSearchWorkflowInput) (*StateCriminalSearchWorkflowResult, error) {
	var result StateCriminalSearchWorkflowResult

	name := input.FullName
	knownaddresses := input.KnownAddresses
	var crimes []string

	for _, address := range knownaddresses {
		activityInput := activities.StateCriminalSearchInput{
			FullName: name,
			Address:  address,
		}
		var activityResult activities.StateCriminalSearchResult

		ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
			StartToCloseTimeout: time.Minute,
		})

		statecheck := workflow.ExecuteActivity(ctx, a.StateCriminalSearch, activityInput)

		err := statecheck.Get(ctx, &activityResult)
		if err == nil {
			crimes = append(crimes, activityResult.Crimes...)
		}
	}
	result.Crimes = crimes

	r := StateCriminalSearchWorkflowResult(result)
	return &r, nil
}

```
<!--SNIPEND-->

![Swim lane diagram of the State Criminal Search Child Workflow Execution](/diagrams/background-checks/state-criminal-search-flow.svg)
