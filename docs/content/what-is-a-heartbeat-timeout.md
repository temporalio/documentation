---
id: what-is-a-heartbeat-timeout
title: What is a Heartbeat Timeout?
description: todo
---

Maximum time between Heartbeat requests.
  When an Activity calls the Heartbeat API, the calls will not be sent to the service unless the Heartbeat Timeout is specified.
  If a Heartbeat Timeout is specified then the Activity must call the Heartbeat API within this timeout.
  See [Long Running Activities](#long-running-activities).
