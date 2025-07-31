Metrics in Python are configured globally; therefore, you should set a Prometheus endpoint before any other Temporal code.

The following example exposes a Prometheus endpoint on port `9000`.

```python
from temporalio.runtime import Runtime, TelemetryConfig, PrometheusConfig

# Create a new runtime that has telemetry enabled. Create this first to avoid
# the default Runtime from being lazily created.
new_runtime = Runtime(telemetry=TelemetryConfig(metrics=PrometheusConfig(bind_address="0.0.0.0:9000")))
my_client = await Client.connect("my.temporal.host:7233", runtime=new_runtime)
```

## Set up tracing {#tracing}

**How to set up tracing**

Tracing allows you to view the call graph of a Workflow along with its Activities and any Child Workflows.

Temporal Web's tracing capabilities mainly track Activity Execution within a Temporal context. If you need custom tracing specific for your use case, you should make use of context propagation to add tracing logic accordingly.

To configure tracing in Python, install the `opentelemetry` dependencies.

```bash
# This command installs the `opentelemetry` dependencies.
pip install temporalio[opentelemetry]
```

Then the [`temporalio.contrib.opentelemetry.TracingInterceptor`](https://python.temporal.io/temporalio.contrib.opentelemetry.TracingInterceptor.html) class can be set as an interceptor as an argument of [`Client.connect()`](https://python.temporal.io/temporalio.client.Client.html#connect).

When your Client is connected, spans are created for all Client calls, Activities, and Workflow invocations on the Worker.
Spans are created and serialized through the server to give one trace for a Workflow Execution.

