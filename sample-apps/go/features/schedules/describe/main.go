// dacx
package main

import (
	"context"
	"log"

	"go.temporal.io/sdk/client"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create Temporal Client", err)
	}
	defer temporalClient.Close()

	// create Schedule
	scheduleHandle, _ := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID: "test-schedule-describe-spec-cron-schedule",
		Spec: client.ScheduleSpec{
			CronExpressions: []string{
				"0 12 * * MON",
			},
		},
	})
	// describe schedule
	scheduleHandle.Describe(ctx)
}

/*
`Describe` retrieves information about the current Schedule configuration.
This can include details about the Schedule Spec (such as Intervals), CronExpressions, and Schedule State.

To describe a Schedule, use `Describe()` on the ScheduleHandle.
*/

/* @dacx
id: how-to-describe-a-schedule-in-go
title: How to describe a Schedule in Go
label: Describe Schedule
description: To describe a Schedule in Go, use `Describe()` on the ScheduleHandle.
tags:
- go sdk
- code sample
- schedule
- describe
lines: 11, 33, 36-41
@dacx */
