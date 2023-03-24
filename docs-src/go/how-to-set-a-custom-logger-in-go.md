---
id: how-to-set-a-custom-logger-in-go
title: How to set a custom logger in Go
sidebar_label: Custom logger
description: Set a custom logger
tags:
  - go
  - how-to
---

This field sets a custom Logger that is used for all logging actions of the instance of the Temporal Client.

Although the Go SDK does not support most third-party logging solutions natively, [our friends at Banzai Cloud](https://github.com/sagikazarmark) built the adapter package [logur](https://github.com/logur/logur) which makes it possible to use third party loggers with minimal overhead.
Most of the popular logging solutions have existing adapters in Logur, but you can find a full list [in the Logur Github project](https://github.com/logur?q=adapter-).

Here is an example of using Logur to support [Logrus](https://github.com/sirupsen/logrus):

```go
package main
import (
  "go.temporal.io/sdk/client"

	"github.com/sirupsen/logrus"
	logrusadapter "logur.dev/adapter/logrus"
	"logur.dev/logur"
)

func main() {
  // ...
  logger := logur.LoggerToKV(logrusadapter.New(logrus.New()))
  clientOptions := client.Options{
    Logger: logger,
  }
  temporalClient, err := client.Dial(clientOptions)
  // ...
}
```
