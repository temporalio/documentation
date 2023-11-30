---
id: overview
title: Temporal Go SDK Workflow Cancellation feature overview
sidebar_label: Cancellation
description: Temporal Go SDK Workflow Cancellation feature overview
tags:
  - cancellation
  - heartbeat
  - activity
  - workflow
  - temporal client api
---

The Temporal Go SDK uses an error type to indicate that there is a cancellation request.

It's considered a request because the Workflow and any cancellable Activities must listen for the error to act upon it.
If they're not listening for it, then Cancellation requests get ignored.

To listen for a Cancellation request in your Temporal Application implement the following:

- Add logic to listen for and handle the Cancellation in the Workflow.
- Add Heartbeats to Cancellable Activities.
- Set Heartbeat Timeouts for Cancellable Activities.
- Use the Temporal Client's Cancellation Request API to request Cancellation.
