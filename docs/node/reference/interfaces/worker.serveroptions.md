# Interface: ServerOptions

[worker](../modules/worker.md).ServerOptions

## Table of contents

### Properties

- [identity](worker.serveroptions.md#identity)
- [longPollTimeout](worker.serveroptions.md#longpolltimeout)
- [namespace](worker.serveroptions.md#namespace)
- [url](worker.serveroptions.md#url)
- [workerBinaryId](worker.serveroptions.md#workerbinaryid)

## Properties

### identity

• `Optional` **identity**: *string*

A human-readable string that can identify your worker

**`default`** `${process.pid}@${os.hostname()}`

___

### longPollTimeout

• `Optional` **longPollTimeout**: *string*

Timeout for long polls (polling of task queues)

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### namespace

• `Optional` **namespace**: *string*

What namespace will we operate under

**`default`** default

___

### url

• `Optional` **url**: *string*

The URL of the Temporal server to connect to

**`default`** http://localhost:7233

___

### workerBinaryId

• `Optional` **workerBinaryId**: *string*

A string that should be unique to the exact worker code/binary being executed

**`default`** `@temporal/worker` package name and version
