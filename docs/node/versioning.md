# Workflow versioning

Workflow code has to be [deterministic](/docs/node/determinism) by taking the same code path when replaying history events. Any Workflow code change that affects the order in which commands are generated breaks this assumption.

While other SDKs (e.g [Java](/docs/java/versioning)) support versioning, for the alpha release we do not support this, it will be added shortly after the alpha.

Issue can be tracked on [github](https://github.com/temporalio/sdk-node/issues/68).
