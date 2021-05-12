Workflow method arguments and return values are serializable to a [Payload](https://github.com/temporalio/api/blob/4c2f6a281fa3fde8b0a24447de3e0d0f47d230b4/temporal/api/common/v1/message.proto#L49) protobuf that contains a bytearray as well as metadata map. You can use <a href={props.href}>the SDK's DataConverter interface</a> to do this.
The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.

Even though Workflow execution history is cached in the Workers, in the case of Worker failure, the full execution history has to be transferred from the Temporal service to the Workflow Workers.

In those cases a large execution history could adversely impact the performance of your Workflow. Be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.

We discuss how to work around the history size limitations with `ContinueAsNew` in the <a href={props.continueAsNewURL}>Large Event Histories</a> section.
