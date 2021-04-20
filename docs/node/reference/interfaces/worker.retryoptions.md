# Interface: RetryOptions

[worker](../modules/worker.md).RetryOptions

Defines options for activity retries

**`see`** [Java SDK definition](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/RetryOptions.Builder.html)

## Table of contents

### Properties

- [backoffCoefficient](worker.retryoptions.md#backoffcoefficient)
- [initialInterval](worker.retryoptions.md#initialinterval)
- [maximumAttempts](worker.retryoptions.md#maximumattempts)
- [maximumInterval](worker.retryoptions.md#maximuminterval)

## Properties

### backoffCoefficient

• `Optional` **backoffCoefficient**: *number*

Coefficient used to calculate the next retry interval.
The next retry interval is previous interval multiplied by this coefficient.

**`minimum`** 1

**`default`** 2

___

### initialInterval

• **initialInterval**: *string*

Interval of the first retry.
If coefficient is 1 then it is used for all retries

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### maximumAttempts

• `Optional` **maximumAttempts**: *number*

Maximum number of attempts. When exceeded the retries stop even if not expired yet.

**`minimum`** 1

**`default`** Infinity

___

### maximumInterval

• `Optional` **maximumInterval**: *string*

Maximum interval between retries.
Exponential backoff leads to interval increase.
This value is the cap of the increase.

**`default`** 100x of [initialInterval](worker.retryoptions.md#initialinterval)

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string
