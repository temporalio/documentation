// dacx
package main

import (
	"context"
	"fmt"
	"log"
	"time"

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

	// Retrieve the already existing schedule
	scheduleID := "schedule_id"
	scheduleHandle := temporalClient.ScheduleClient().GetHandle(ctx, scheduleID)
	if scheduleHandle == nil {
		log.Fatalln("Unable to retrieve schedule")
	}

	// Pause the schedule and print the status
	err = scheduleHandle.Pause(ctx, client.SchedulePauseOptions{
		Note: "The Schedule has been paused.",
	})
	if err != nil {
		log.Fatalln("Unable to pause schedule", err)
	}
	fmt.Println("The Schedule has been paused.")

	// Wait for 5 seconds
	time.Sleep(5 * time.Second)

	// Unpause the schedule
	err = scheduleHandle.Unpause(ctx, client.ScheduleUnpauseOptions{
		Note: "The Schedule has been unpaused.",
	})
	if err != nil {
		log.Fatalln("Unable to unpause schedule", err)
	}
	fmt.Println("The Schedule has been unpaused.")
}

/*
`Pause` and `Unpause` enable the start or stop of all future Workflow Runs on a given Schedule.

Pausing a Schedule halts all future Workflow Runs.
Pausing can be enabled by setting `State.Paused` to `true`, or by using `Pause()` on the ScheduleHandle.

Unpausing a Schedule allows the Workflow to execute as planned.
To unpause a Schedule, use `Unpause()` on `ScheduleHandle`.
*/

/* @dacx
id: how-to-pause-a-schedule-in-go
title: How to pause a Schedule in Go
label: Pause Schedule
description: To pause or unpause a Schedule in Go, use `Pause()` or `Unpause()` on the `ScheduleHandle`.
tags:
- go sdk
- code sample
- schedule
- pause
- unpause
lines: 13, 52-60, 31-33, 43-45
@dacx */
