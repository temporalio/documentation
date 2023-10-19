---
id: backgroundcheck-boilerplate-run-workers
title: Run your Workflow and Activities using a Worker
sidebar_label: Run Workers
description: Configure Workers running in various environments
tags:
  - worker
  - developer guide
  - temporal client
---

Now that you've written a Workflow and an Activity, it is time to run a Worker
to execute your code. The Worker itself is provided by the Temporal SDK, but your
application will include code to configure and run it. When that code executes,
the Worker establishes a persistent connection to the Temporal Cluster and begins
polling a Task Queue on the Cluster, seeking work to perform.

Since Workers execute your code, any Workflows or Activities you invoke will make
no progress unless at least one Worker is running.
