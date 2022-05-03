Workflow return values must also be serializable.
Returning results, returning errors, or throwing exceptions is fairly idiomatic in each language that is supported.
However, Temporal APIs that must be used to get the result of a Workflow Execution will only ever receive one of either the result or the error.
