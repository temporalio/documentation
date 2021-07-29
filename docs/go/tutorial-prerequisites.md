---
id: tutorial-prerequisites
title: Go SDK tutorial prerequisites
sidebar_label: Tutorial prerequisites
---

To follow the Go SDK tutorials we recommend that you have the following environments set up.

## Go

Make sure you have [Go](https://golang.org/doc/install) installed. These tutorials were produced using Go 1.14.

## Temporal server

Download, install, and run the Temporal server via `docker-compose`.

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

You can find full Temporal server setup instructions here: [https://docs.temporal.io/docs/server/quick-install](/docs/server/quick-install).

Keep it running in the background while you build applications.
