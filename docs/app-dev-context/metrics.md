Each [Temporal SDK](/concepts/what-is-a-temporal-sdk) is capable of emitting a set of metrics, some from a Temporal Client and some from the Worker Processes.

The full set of metrics is available in the [SDK metrics reference](/references/).

Monitoring and observing the metrics is optional.
The metrics can be scraped and stored in time series databases like:

- [Prometheus](https://prometheus.io/docs/introduction/overview/)
- [M3db](https://m3db.io/docs/)
- [statsd](https://github.com/statsd/statsd)

Temporal also provides a dashboard you can integrate with graphing services like [Grafana](https://grafana.com/docs/). For more information, see Temporal’s [Grafana dashboard](https://github.com/temporalio/dashboards).
