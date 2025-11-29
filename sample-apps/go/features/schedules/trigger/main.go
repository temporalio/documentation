// dacx
package main

import (
	"context"
	"log"
	"time"

	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Create a Workflow to trigger
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create Temporal Client", err)
	}
	defer temporalClient.Close()

	// Create a Schedule to trigger
	scheduleHandle, _ := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID:      "trigger-schedule",
		Spec:    client.ScheduleSpec{},
		Action:  &client.ScheduleWorkflowAction{},
		Paused:  true,
		Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
	})

	// Trigger Schedule
	for i := 0; i < 5; i++ {
		scheduleHandle.Trigger(ctx, client.ScheduleTriggerOptions{
			Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
		})
		time.Sleep(2 * time.Second)
	}
}

/*
Triggering a Schedule immediately executes an Action defined in that Schedule.
By default, `trigger` is subject to the Overlap Policy.

To trigger a Scheduled Workflow Execution, use `trigger()` on `ScheduleHandle`.
*/

/* @dacx
id: how-to-trigger-a-schedule-in-go
title: How to trigger a Schedule in Go
label: Trigger Schedule
description: To trigger a Schedule in Go, use `trigger()` on `ScheduleHandle`.
tags:
- go sdk
- code sample
- schedule
- trigger
lines: 13, 36-41, 44-49
@dacx */
