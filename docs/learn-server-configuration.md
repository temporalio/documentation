---
id: learn-server-configuration
title: Configuring Temporal
sidebar_label: Configuration
---

Temporal Server configuration is found in `development.yaml` and may contain the following possible sections:

- [**server**](#server) 
- [**persistence**](#persistence) 
- [**log**](#log) 
- [**clusterMetadata**](#clusterMetadata)
- [**services**](#service) 
- [**kafka**](#kafkaConfig) 
- [**publicClient**](#publicClient) 
- archival
- dcRedirectionPolicy
- dynamicConfigClient
- namespaceDefaults

**Note:** Changing any properties in `development.yaml` file requires a process restart for changes to take effect.

**Note:** If you'd like to dig deeper and see how we actually parse this file, see our source code [here](https://github.com/temporalio/temporal/blob/master/common/service/config/config.go).

## server

The `server` section contains process-wide configuration. See below for a minimal server configuration (optional parameters are commented out.)

```yaml
server:
  ringpop: 
    name: temporal
    #maxJoinDuration: 30s
    #broadcastAddress: "127.0.0.1"
  #pprof:
    #port: 7936

```

### ringpop - *required*

The `ringpop` section controls the following membership layer parameters:

- `name` - *required* - used to identify other cluster members in a ringpop ring. This must be the same for all nodes.
- `maxJoinDuration` - The amount of time the service will attempt to join the gossip layer before failing.
- `broadcastAddress` - Used as the address that is communicated to remote nodes to connect on. 
  - This is generally used when BindOnIP would be the same across several nodes (ie: 0.0.0.0) and for nat traversal scenarios. `net.ParseIP` controls the supported syntax. Note: Only IPV4 is supported.

### pprof

- `port` - If specified, this will initialize pprof upon process start on the listed port.

## persistence
The `persistence` section holds configuration for the data store / persistence layer. Below is an example minimal specification for a password-secured Cassandra cluster.
```yaml
persistence:
  defaultStore: default
  visibilityStore: visibility
  numHistoryShards: 512
  datastores:
    default:
      cassandra:
        hosts: "127.0.0.1"
        keyspace: "temporal"
        user: "mark"
        password: "password"
    visibility:
      cassandra:
        hosts: "127.0.0.1"
        keyspace: "temporal_visibility"
```

The following top level configuration items are required:

- `numHistoryShards` - *required* - the number of history shards to create when initializing the cluster. 
  - **Warning**: This value is immutable and will be ignored after the first run. Please ensure you set this value appropriately high enough to scale with the worst case peak load for this cluster.
- `defaultStore` - *required* - the name of the data store definition that should be used by the Temporal server.
- `visiblityStore` - *required* - the name of the data store definition that should be used by the Temporal visibility server.
- `datastores` - *required* - contains named data store definitions to be referenced.
  - Each definition is defined with a heading declaring a name (ie: `default:` and `visibility:` above), which contains a data store definition.
  - data store definions must be either `cassandra` or `sql`.

A `cassandra` data store definition can contain the following values:

- `hosts` - *required* - a csv of Cassandra endpoints.
- `port` - default: 9042 - Cassandra port used for connection by `gocql` client.
- `user` - Cassandra user used for authentication by `gocql` client.
- `password` - Cassandra password used for authentication by `gocql` client.
- `keyspace` - *required* -  the Cassandra keyspace.
- `datacenter` - the data center filter arg for Cassandra.
- `maxConns` - the max number of connections to this data store for a single TLS configuration.
- `tls` - See TLS below.

A `sql` data store definition can contain the following values:

- `user` - user used for authentication.
- `password` - password used for authentication.
- `pluginName` - *required* - SQL database type.
  - *Valid values*: `mysql` or `postgres`.
- `databaseName` - *required* - the name of SQL database to connect to.
- `connectAddr` - *required* - the remote addr of the database.
- `connectProtocol` - *required* - the protocol that goes with the `connectAddr`
  - *Valid values*: `tcp` or `unix`
- `connectAttributes` - a map of key-value attributes to be sent as part of connect `data_source_name` url.
- `maxConns` - the max number of connections to this data store.
- `maxIdleConns` - the max number of idle connections to this data store
- `maxConnLifetime` - is the maximum time a connection can be alive.
- `numShards` - number of storage shards to use for tables in a sharded sql database (*Default:* 1).
- `tls` - See below.

`tls` sections may contain:
- `enabled` - *boolean*.
- `serverName` - name of the server hosting the data store.
- `certFile` - path to the cert file.
- `keyFile` - path to the key file.
- `caFile` - path to the ca file.
- `enableHostVerification` - *boolean* - `true` to verify the hostname and server cert (like a wildcard for Cassandra cluster). This option is basically the inverse of `InSecureSkipVerify`. See `InSecureSkipVerify` in http://golang.org/pkg/crypto/tls/ for more info.

Note: `certFile` and `keyFile` are optional depending on server config, but both fields must be omitted to avoid using a client certificate.

## log
The `log` section is optional and contains the following possible values:

- `stdout` - *boolean* - `true` if the output needs to go to standard out.
- `level` - sets the logging level.
    - *Valid values* - debug, info, warn, error or fatal.
- `outputFile` - path to output log file.

## clusterMetadata

`clusterMetadata` contains all cluster definitions, including those which participate in cross DC.

An example `clusterMetadata` section:
```yaml
clusterMetadata:
    enableGlobalNamespace: false
    failoverVersionIncrement: 10
    masterClusterName: "active"
    currentClusterName: "active"
    clusterInformation:
        active:
            enabled: true
            initialFailoverVersion: 0
            rpcAddress: "127.0.0.1:7233"
    #replicationConsumer:
      #type: kafka
```
- `currentClusterName` - *required* - the name of the current cluster. **Warning**: This value is immutable and will be ignored after the first run.
- `enableGlobalNamespace` - *Default:* `false`.
- `replicationConsumerConfig` - determines which method to use to consume replication tasks. The type may be either `kafka` or `rpc`.
- `failoverVersionIncrement` - the increment of each cluster version when failover happens.
- `masterClusterName` - the master cluster name, only the master cluster can register/update namespace. All clusters can do namespace failover.
- `clusterInformation` - contains a map of cluster names to `ClusterInformation` definitions. `ClusterInformation` sections consist of:
  - `enabled` - *boolean*
  - `initialFailoverVersion`
  - `rpcAddress` - indicate the remote service address (host:port). Host can be DNS name. Use `dns:///` prefix to enable round-robin between IP address for DNS name.

## services
The `services` section contains configuration keyed by service role type. There are four supported service roles:

- `frontend`
- `matching`
- `worker`
- `history`

Below is a minimal example of a `frontend` service definition under `services`:
```yaml
services:
  frontend:
    rpc:
      grpcPort: 8233
      membershipPort: 8933
      bindOnLocalHost: true
    metrics:
      statsd:
        hostPort: "127.0.0.1:8125"
        prefix: "temporal_standby"

```

There are two sections defined under each service heading:

### rpc - *required*
`rpc` contains settings related to the way a service interacts with other services. The following values are supported:

- `grpcPort` is the port  on which gRPC will listen.
- `membershipPort` - used by the membership listener (ringpop).
- `bindOnLocalHost` - uses `localhost` as the listener address.
- `bindOnIP` - used to bind service on specific ip (eg. `0.0.0.0`) - check `net.ParseIP` for supported syntax, only IPv4 is supported, mutually exclusive with `BindOnLocalHost` option.
- `disableLogging` - disables all logging for rpc.
- `logLevel` - the desired log level.

**Note**: Port values are currently expected to be consistent among role types across all hosts. 

### metrics
`metrics` contains configuration for the metrics subsystem keyed by provider name. There are three supported providers:

- `statsd`
- `prometheus`
- `m3`

The `statsd` sections supports the following settings:

- `hostPort` - the statsd server host:port.
- `prefix` - specific prefix in reporting to `statsd`.
- `flushInterval` - maximum interval for sending packets. (*Default* 1 second).
- `flushBytes` - specifies the maximum UDP packet size you wish to send. (*Default* 1432 bytes).

Additionally, metrics supports the following non-provider specific settings:

- `tags` - the set of key-value pairs to be reported.
- `prefix` - sets the prefix to all outgoing metrics.

## kafka
The `kafka` section describes the configuration needed to connect to all Kafka clusters and supports the following values:

- `tls` - uses the TLS structure as under the `persistence` section.
- `clusters` - map of named `ClusterConfig` definitions, which describe the configuration for each Kafka cluster. A `ClusterConfig` definition contains a list of brokers using the configuration value `brokers`.
- `topics` - map of topics to Kafka clusters.
- `temporal-cluster-topics`- map of named `TopicList` definitions.
- `applications` - map of named `TopicList` definitions.

A `TopicList` definition describes the topic names for each cluster and contains the following required values:
- `topic`
- `retryTopic`
- `dlqTopic`

Below is a sample `kafka` section:

```yaml
kafka:
  tls:
    enabled: false
    certFile: ""
    keyFile: ""
    caFile: ""
  clusters:
    test:
      brokers:
        - 127.0.0.1:9092
  topics:
    active:
      cluster: test
    active-dlq:
      cluster: test
    standby:
      cluster: test
    standby-dlq:
      cluster: test
    other:
      cluster: test
    other-dlq:
      cluster: test
  temporal-cluster-topics:
    active:
      topic: active
      dlq-topic: active-dlq
    standby:
      topic: standby
      dlq-topic: standby-dlq
    other:
      topic: other
      dlq-topic: other-dlq
```

## publicClient 
`publicClient` is a required section that contains a single value `hostPort` that is used to specify IPv4 address or DNS name and port to reach a frontend client.

Example:
```yaml
publicClient:
  hostPort: "localhost:8933"
```

Use `dns:///` prefix to enable round-robin between IP address for DNS name.
