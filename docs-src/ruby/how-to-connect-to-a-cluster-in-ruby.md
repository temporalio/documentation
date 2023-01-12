---
id: how-to-connect-to-a-cluster-in-ruby
title: How to connect to a Temporal Cluster in Ruby
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the Ruby SDK.
tags:
  - developer-guide
  - sdk
  - ruby
---

Use the [`Temporalio::Connection`](https://rubydoc.info/gems/temporalio/Temporalio/Connection) class to establish a connection to the Temporal Server.

Specify the `host` parameter as a string.

```ruby
Temporalio::Connection.new('localhost:7233')
```

To initialize a [Client](https://rubydoc.info/gems/temporalio/Temporalio/Client#namespace-instance_method), pass the [connection](https://rubydoc.info/gems/temporalio/Temporalio/Connection) object and a [Namespace](https://rubydoc.info/gems/temporalio/Temporalio/Client#namespace-instance_method).

```ruby
connection = Temporalio::Connection.new('localhost:7233')
Temporalio::Client.new(connection, 'your-custom-namespace')
```
