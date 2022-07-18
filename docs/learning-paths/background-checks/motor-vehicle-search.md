---
id: motor-vehicle-search
title: What does the Motor Vehicle Search Workflow Definition look like?
sidebar_label: Motor Vehicle
description: The Motor Vehicle Search Workflow calls an external API via an Activity Execution and returns the results.
---

<!--SNIPSTART background-checks-motor-vehicle-workflow-definition-->
[workflows/motor_vehicle_incident_search.go](https://github.com/temporalio/background-checks/blob/master/workflows/motor_vehicle_incident_search.go)
```go
func MotorVehicleIncidentSearch(ctx workflow.Context, input *MotorVehicleIncidentSearchWorkflowInput) (*MotorVehicleIncidentSearchWorkflowResult, error) {
	var result MotorVehicleIncidentSearchWorkflowResult

	name := input.FullName
	address := input.Address
	var motorvehicleIncidents []string

	activityInput := activities.MotorVehicleIncidentSearchInput{
		FullName: name,
		Address:  address,
	}
	var activityResult activities.MotorVehicleIncidentSearchResult

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
	})

	motorvehicleIncidentSearch := workflow.ExecuteActivity(ctx, a.MotorVehicleIncidentSearch, activityInput)

	err := motorvehicleIncidentSearch.Get(ctx, &activityResult)
	if err == nil {
		motorvehicleIncidents = append(motorvehicleIncidents, activityResult.MotorVehicleIncidents...)
	}
	result.MotorVehicleIncidents = motorvehicleIncidents

	r := MotorVehicleIncidentSearchWorkflowResult(result)
	return &r, nil
}

```
<!--SNIPEND-->

![Swim lane diagram of the State Criminal Search Child Workflow Execution](/diagrams/background-checks/motor-vehicle-search-flow.svg)
