---
id: what-are-the-default-limits-for-temporal-cloud
title: Default limits for Temporal Cloud
sidebar_label: Cloud limits
description: The default experience in Temporal Cloud has limits, some of which are configurable.
---

<!--- What are the default limits for Temporal Cloud? --->

The default experience in Temporal Cloud has the following limits.
Some of these limits are configurable.

<!--- What are the default limits for accounts in Temporal Cloud? --->

## Account default limits

|                                      | Default                | Maximum (self-serve) | Maximum (system)                     |
| ------------------------------------ | ---------------------- | -------------------- | ------------------------------------ |
| Namespaces                           | 10                     | 10                   | 1,000                                |
| Prometheus endpoint Retention Period | 1 month                |                      | 1 month                              |

<!--- What are the default limits for Namespaces in Temporal Cloud? --->

## Namespace default limits

|                          | Default                                                | Maximum (self-serve) | Maximum (system)                     |
| ------------------------ | ------------------------------------------------------ | -------------------- | ------------------------------------ |
| Actions per second       | 100                                                    | 100                  | Contact us                            |
| Certificates             | 32-KB payload or 16 certificates, whichever is smaller |                      | 32-KB payload or 16 certificates     |
| Concurrent Task pollers  | 2,000                                                  | 100,000              | 100,000                              |
| Custom Search Attributes | 20; max of 5 for text                                  |                      | 20; max of 5 for text                |
| Retention Period         | 7 days                                                 | 90 days              | 90 days                              |

<!--- How to change the default limits for Temporal Cloud --->

## Change the default limits

For some limits, values greater than the self-serve maximum are available, up to the system maximum.
To raise a default limit beyond its self-serve maximum, file a support ticket.
