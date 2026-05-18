// dacx
package main

import (
	"context"
	"log"

	"github.com/pborman/uuid"
	schedule "github.com/temporalio/documentation-samples-go/feature/schedules"
	"go.temporal.io/sdk/client"
)

func main() {
	ctx := context.Background()
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create Temporal Client", err)
	}
	defer temporalClient.Close()

	// Create Schedule and Workflow IDs
	scheduleID := "schedule_" + uuid.New()
	workflowID := "schedule_workflow_" + uuid.New()
	// Create the schedule.
	scheduleHandle, err := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID:   scheduleID,
		Spec: client.ScheduleSpec{},
		Action: &client.ScheduleWorkflowAction{
			ID:        workflowID,
			Workflow:  schedule.ScheduleWorkflow,
			TaskQueue: "schedule",
		},
	})
	if err != nil {
		log.Fatalln("Unable to create schedule", err)
	}
	scheduleHandle.GetID()
	// list schedules
	listView, _ := temporalClient.ScheduleClient().List(ctx, client.ScheduleListOptions{
		PageSize: 1,
	})

	for listView.HasNext() {
		log.Println(listView.Next())
	}
}

/*
The `List` action returns all available Schedules and their respective Schedule IDs.

To return information on all Schedules, use `ScheduleClient.List()`.
*/

/* @dacx
id: how-to-list-a-schedule-in-go
title: How to list a Schedule in Go
label: List Schedules
description: To list all Schedules in Go, use `ScheduleClient.List()`.
tags:
- go sdk
- code sample
- schedule
- list
lines: 13, 41-47, 50-54
@dacx */
