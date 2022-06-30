Temporal emits metrics which gives you insight into how your application and service are working and performing. Monitoring and observing those metrics is optional. Any software that can pull metrics that supports the same format could be used, but we ensure it works with Prometheus and Grafana versions.

You can store your data in time series databases like:

- [Prometheus](https://prometheus.io/docs/introduction/overview/),
- [M3db](https://m3db.io/docs/)
- [statsd](https://github.com/statsd/statsd)

Temporal also provides a dashboard you can integrate with graphing services like Grafana. For more information, see Temporal’s [Grafana dashboard](https://github.com/temporalio/dashboards).

There are a variety of metrics which gives you information into your service, persistence, and Workflow metrics. For more information on metrics, see the [SDK metric reference](../references/sdk-metrics).
