---
id: how-to-set-connectionoptions-in-go
title: How to set ConnectionOptions in Go
sidebar_label: ConnectionOptions
description: TODO
tags:
  - go
  - developer-guide
---

- Options to control optional connection params

| Option                       | Description                                                                   | Type          |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------- |
| TLS                          | Configures connection level security credentials                              | tls.Config    |
| Authority                    | Set the value to be used as the :authority pseudo-header                      | string        |
| DisableHealthCheck           | Disable health check                                                          | bool          |
| HealthCheckAttemptTimeout    | Specify how to long to wait for service response on each health check attempt | time.Duration |
| HealthCheckTimeout           | Set the default health check timeout                                          | time.Duration |
| EnableKeepAliveCheck         | Set enable keep alive check                                                   | bool          |
| KeepAliveTime                | Set the keep alive time                                                       | time.Duration |
| KeepAliveTimeout             | Set the keep alive timeout                                                    | time.Duration |
| KeepAlivePermitWithoutStream | Set if client sends keepalive pings even with no active RPCs                  | bool          |
