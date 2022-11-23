---
id: show
title: tctl admin workflow show
sidebar_label: show
description: Showing Workflow history.
tags:
  - tctl
  - admin
  - workflow
---

The `tctl admin workflow show` command displays Workflow history from the database.

#### --workflow_id value

Alias: `-w`

The current Workflow.

#### --run_id value

Alias: `-r`

The current RunId.

#### --min_event_id value

The minimum Event Id to include in the history.

Default: 0

#### --max_event_id value

The maximum Event Id to include in the history.

Default: 0

#### --min_event_version value

The start Event version to be included in the history.

Default: 0

#### --max_event_version value

The end Event version to be included in the history.

Default: 0

#### --output_filename value

The file where the output is sent to.
