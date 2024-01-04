// dacx
package activities

import (
	"context"
)

/*
In the Temporal Go SDK programming model, an Activity is an exportable function or a `struct` method.
Below is an example of an Activity defined as a function.
*/

// SSNTraceActivity is your custom Activity Definition.
func SSNTraceActivity(ctx context.Context, param string) (*string, error) {
	// This is where a call to another service is made
	// Here we are pretending that the service that does SSNTrace returned "pass"
	result := "pass"
	return &result, nil
}

/*
The first parameter of an Activity Definition is `context.Context`.
This parameter is optional for an Activity Definition, though it is recommended, especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable.
For example, parameters can’t be channels, functions, variadic, or unsafe pointers.
*/

/* @dacx
id: backgroundcheck-boilerplate-ssntrace-activity
title: Boilerplate Activity code
label: Activity code
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- code sample
- activity
lines: 2-19
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-activity-details
title: Boilerplate Activity code details
label: Activity code details
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- activity
lines: 21-28
@dacx */
