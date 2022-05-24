---
tags:
  - Temporal
  - productivity
  - tips
posted_on_: 2021-07-30T00:00:09Z
slug: temporal-tips-tricks-1
title: 'Tips and Tricks for Temporal Developer Productivity'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.11.2
---


<!--truncate-->

Discussions about Temporal often get into very high-minded distributed systems debates, but sometimes it can be helpful to swap small tips that can have a huge impact on developer productivity!

Here's a small collection of 4 tips we put together for you.

## Auto-Restarting Workers

When you write Activity or Workflow code, you often have to kill and restart the Workers that host them, so as to pick up the changes. Usually this is a manual `Ctrl+C` + rerun process. However, you can set up your workers to reload on every *file save*. Since Workers are stateless and Workflows are tolerant to Workers going down, this works just fine.

There are many ways to achieve this. You can use [`gow`](https://github.com/mitranim/gow) as a drop in replacement for the go binary that reloads upon save.  `nodemon` from the JavaScript ecosystem is a nice fully cross-platform binary that watches files and executes scripts.

```bash
# using gow
go install github.com/mitranim/gow@latest
gow run path/to/worker.go

# using nodemon
npm i -g nodemon
nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run path/to/worker.go
alias gow="nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run " # alias for shortcut
```

Obviously constantly rerunning a command on every file save may be a problem in some cases, so use your best judgement.

## Code Snippets

This is a generally applicable developer productivity tip, but there will always be some amount of unavoidable boilerplate in code and Temporal is no exception. Roll your commonly used code into reusable snippets, and take advantage of modern snippet features like [Tab Stops, Placeholders, and Transformations](https://macromates.com/manual/en/snippets#tab_stops).

```go
// @prefix newclient
// @description add new client

// The client is a heavyweight object that should be created once
// options https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/internal#ClientOptions
${0:newClient}, err := client.NewClient(client.Options{})
if err != nil {
	log.Fatalln("Unable to create client", err)
}
defer ${0:newClient}.Close()
```

You can even leave comments to relevant documentation, like this:

```go
// @prefix RetryPolicy
// @description simple retry policy

// https://docs.temporal.io/concepts/what-is-a-retry-policy
    RetryPolicy: 			&temporal.RetryPolicy{
			InitialInterval:    time.Second,
			BackoffCoefficient: 2,
			MaximumInterval:    time.Minute * 10,
			MaximumAttempts:    5,
		},
```

You can look up how to do this in [TextMate](https://macromates.com/manual/en/snippets), [Atom](https://flight-manual.atom.io/using-atom/sections/snippets/), and [Sublime Text](http://docs.sublimetext.info/en/latest/extensibility/snippets.html).

In VS Code, you should try [the Easy Snippet extension](https://marketplace.visualstudio.com/items?itemName=inu1255.easy-snippet) to make writing [VS Code's User Defined Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) easier. Here's a [short video](https://twitter.com/swyx/status/1420772267772968960) demonstrating usage of Easy Snippet.

## Stack Trace

One of the lesser known but extremely useful features of [Temporal Web](https://docs.temporal.io/devtools/web-ui#viewing-stack-traces-on-temporal-web) is the ability to view stack traces.

![image](https://user-images.githubusercontent.com/6764957/127705775-8de7c70d-5d89-4b1b-8f4a-8dcd9ccb70f7.png)

This helps greatly with debugging and understanding how Temporal deals with asynchronous work and is able to resume workflows on a different machine.

## Event History

You can export the event history via [`tctl`](https://docs.temporal.io/devtools/tctl#show-workflow-history) or the [Web UI](https://docs.temporal.io/devtools/web-ui#execution-histories-on-temporal-web):

```bash
tctl workflow show \
  -w myWorkflowId \
  -r 866ae14c-88cf-4f1e-980f-571e031d71b0
```

This is not just good for recordkeeping, but also great for taking a failing production workflow and debug it locally, exactly as it was executed.

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=kkP899WxgzY' />

Before a migration, you can [replay event histories in a test](https://github.com/tsurdilo/temporal-versioning-go/blob/033e04a75049c4bea79908e0619332360c3cddc3/tests/replay_test.go), to verify that you have written backward compatible code:

```go
func (s *replayTestSuite) TestReplayFromInitialVersion() {
	replayer := worker.NewWorkflowReplayer()

	replayer.RegisterWorkflow(workflow.CustomerWorkflow)

	err := replayer.ReplayWorkflowHistoryFromJSONFile(nil, "initversionhistory.json")
	require.NoError(s.T(), err)
}
```
To learn more, you can see [how Temporal tests our Workflow Replay feature](https://github.com/temporalio/sdk-go/tree/6580cbe0aa41a8b515791f95c2c15bb37db1dab1/test/replaytests) since we are open source!

## More tips?

If you have found Temporal specific or general developer productivity tips that Temporal developers might use, let us know, we'd love to do another version of this roundup!
