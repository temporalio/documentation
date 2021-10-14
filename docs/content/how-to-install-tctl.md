---
id: how-to-install-tctl
title: How to install tctl
description: You can install tctl in four ways, described in this topic.
tags:
  - operation-guide
---

import RelatedReadList from '../components/RelatedReadList.js'

You can install [tctl](/docs/content/what-is-tctl) in four ways.

- Install locally by using [Homebrew](https://brew.sh/): `brew install tctl`
- Run locally together with Temporal Server in [docker-compose](https://github.com/temporalio/docker-compose): `docker exec temporal-admin-tools tctl YOUR COMMANDS HERE`
  - To invoke [tctl](/docs/content/what-is-tctl) as though it is installed locally (such as `tctl namespace describe`), set an alias: `alias tctl="docker exec temporal-admin-tools tctl"`
- Run the [temporal-admin-tools](https://hub.docker.com/r/temporalio/admin-tools) Docker image:
  - On Linux: `docker run --rm -it --entrypoint tctl --network host --env TEMPORAL_CLI_ADDRESS=localhost:7233 temporalio/admin-tools:1.12.0`
  - On macOS or Windows: `docker run --rm -it --entrypoint tctl --env TEMPORAL_CLI_ADDRESS=host.docker.internal:7233 temporalio/admin-tools:1.12.0`
  - If your Temporal Server is running on a remote host, change the value of `TEMPORAL_CLI_ADDRESS`.
  - To simplify command lines, create a `tctl` alias.
- Build it locally.
  1. Clone the [Temporal Server repo](https://github.com/temporalio/temporal).
  1. Run `make tctl`.
  1. Copy the `tctl` executable to any directory that appears in the `PATH` environment variable; for example, `/usr/bin/`.

<RelatedReadList
readlist={[
["What is tctl?", "/docs/content/what-is-tctl", "operation guide"],
]}
/>