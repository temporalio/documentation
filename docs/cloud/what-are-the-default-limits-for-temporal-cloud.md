---
id: what-are-the-default-limits-for-temporal-cloud
title: Default limits for Temporal Cloud
sidebar_label: Cloud limits
description: The default experience in Temporal Cloud has limits, some of which are configurable.
---

The default experience in Temporal Cloud has the following limits.
Some of these limits are configurable.

## Account default limits

| | Default | Max (self-serve) | Max (system) |
| --- | --- | --- | --- |
| Audit Log Retention Period | 7 days | | 7 days |
| Namespaces | 10 | 10 | 1,000 |
| Prometheus endpoint Retention Period | 1 month | | 1 month |
| Users | 5,000 active per month | | 5,000 active per month (Auth0 limit) |

## Namespace default limits

| | Default | Max (self-serve) | Max (system) |
| --- |  --- | --- | --- |
| Actions per second | 100 | 100 | unlimited |
| Certificates | 32-KB payload or 16 certificates, whichever is smaller | | 32-KB payload or 16 certificates |
| Concurrent Task pollers | 2,000 | 100,000 | 100,000 |
| Custom Search Attributes | 20; max of 5 for text | | 20; max of 5 for text |
| Retention Period | 7 days | 90 days | 90 days |
| Users | 5,000 active per month | | 5,000 active per month (Auth0 limit) |

For some limits, values greater than the self-serve maximum are available, up to the system maximum.
To raise a default limit beyond its self-serve maximum, file a support ticket.
