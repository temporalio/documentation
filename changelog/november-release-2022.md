---
slug: november-release-2022
title: November 23 2022
date: 2022-11-23T00:00:00Z
---

In November, we published the following content:

- [How to test your Workflows and Activities section of the Developer's guide](/application-development/testing?lang=typescript).
  This section was expanded signifanctly to cover many aspects of testing your application code such as testing frameworks, replays, skipping time, heartbeats, cancellation, and more.
  The only caveat is that most of the available samples are in TypeScript.
  However, more are on the way!

- [Setting up Prometheus and Grafana to view metrics](/kb/prometheus-grafana-setup).
  The Temporal Cluster and SDKs emit metrics that can be used to monitor performance and troubleshoot issues.
  After you enable your monitoring tool, you can relay these metrics to any monitoring and observability platform.
- [Troubleshooting the DeadlineExceeded error](/kb/deadline-exceeded-troubleshooting).
  All client-side requests made to the Temporal Cluster are gRPC requests. Sometimes, when these requests can't be completed, you'll see this particular error message: Context: deadline exceeded.

- [Why you shouldn't use Run Ids in Workflow logic](/kb/non-determinism-issues-for-run-ids).
  The current Run Id is mutable and can change during a Workflow Retry. You should not rely on storing the current Run Id, or using it for any logical choices, because a Workflow Retry changes the Run Id and can lead to non-determinism issues.

We also added the following functionality to the documentation site:

- Cross platform search.
  When using the docs.temporal.io site search feature or the learn.temporal.io site search feature, both of the site's results are made available.
  This means you can search for tutorials on the docs site or core concepts from the learn site.

- Link previews.
  On hover, and When available, local site links will provide a preview of the destination content.
  For example: <a class="tdlp" href="#signal">Signals<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><div class="tdlpc"><p class="tdlppt">What is a Signal?</p><p class="tdlppd">A Signal is an asynchronous request to a Workflow Execution.</p><p class="tdlplm"><a class="tdlplma" href="#signal">Learn more</a></p></div></a>

- Build commands for contributors.
  There are a few different steps to building the full docs site that you see now.

  - [snipsync](https://github.com/temporalio/snipsync) merges source code snippets into Markdown files.
  - The [Assembly Workflow](https://github.com/temporalio/documentation/tree/master/assembly) takes individual information nodes and builds them into the longer user facing narratives.
  - [dPrint](https://github.com/dprint/dprint#readme) ensures there is consistent formatting across the site files.
  - The [Docusaurus build command](https://docusaurus.io/docs/installation#build), generates the bundle of Javascript, CSS, and HTML that is served on the web.

  Each of these can be run individually:

  - `yarn snipsync`
  - `yarn assemble`
  - `yarn format`
  - `yarn build`

  Or you can run them all in the appropriate order using `yarn gen` or `yarn gen-cloud`. Yes, our Assembly Workflow showcases an example of running Workflows through Temporal Cloud using the TypeScript SDK!

  - [/assembly/worker.js](https://github.com/temporalio/documentation/blob/master/assembly/worker.js)
  - [/assemble.js](https://github.com/temporalio/documentation/blob/master/assemble.js)
