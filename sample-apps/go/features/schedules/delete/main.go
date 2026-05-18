// dacx
package main

import (
	"context"
	"log"

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
	scheduleID := "schedule_id"
	// Retrieve the schedule handle by its ID
	scheduleHandle := temporalClient.ScheduleClient().GetHandle(ctx, scheduleID)

	defer func() {
		log.Println("Deleting schedule", "ScheduleID", scheduleHandle.GetID())
		err = scheduleHandle.Delete(ctx)
		if err != nil {
			log.Fatalln("Unable to delete schedule", err)
		}
	}()
}

/*
Deleting a Schedule erases a Schedule.
Deletion does not affect any Workflows started by the Schedule.

To delete a Schedule, use `Delete()` on the `ScheduleHandle`.
*/

/* @dacx
id: how-to-delete-a-schedule-in-go
title: How to delete a Schedule in Go
label: Delete Schedule
description: To delete a Schedule, use `Delete()` on the `ScheduleHandle`.
tags:
- go sdk
- code sample
- schedule
- delete
lines: 11, 26-32, 35-40
@dacx */
