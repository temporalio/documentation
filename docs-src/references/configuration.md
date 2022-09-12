---
id: configuration
title: Temporal Cluster configuration reference
sidebar_label: Cluster configuration
toc_max_heading_level: 5
---

Much of the behavior of a Temporal Cluster is configured using the `development.yaml` file and may contain the following top-level sections:

- [`global`](#global)
- [`persistence`](#persistence)
- [`log`](#log)
- [`clusterMetadata`](#clustermetadata)
- [`services`](#services)
- [`publicClient`](#publicclient)
- [`archival`](#archival)
- [`dcRedirectionPolicy`](#dcredirectionpolicy)
- [`dynamicConfigClient`](#dynamicconfigclient)
- [`namespaceDefaults`](#namespacedefaults)

Changing any properties in the `development.yaml` file requires a process restart for changes to take effect.
Configuration parsing code is available [here](https://github.com/temporalio/temporal/blob/master/common/config/config.go).

## global

The `global` section contains process-wide configuration. See below for a minimal configuration (optional parameters are commented out.)

```yaml
global:
  membership:
    broadcastAddress: "127.0.0.1"
  metrics:
    prometheus:
      framework: "opentelemetry"
      listenAddress: "127.0.0.1:8000"
```

### membership

The `membership` section controls the following membership layer parameters.

#### maxJoinDuration

The amount of time the service will attempt to join the gossip layer before failing.

Default is 10s.

#### broadcastAddress

Used by gossip protocol to communicate with other hosts in the same Cluster for membership info.
Use IP address that is reachable by other hosts in the same Cluster.
If there is only one host in the Cluster, you can use 127.0.0.1.
Check `net.ParseIP` for supported syntax, only IPv4 is supported.

### metrics

Configures the Cluster's metric subsystem.
Specific provides are configured using provider names as the keys.

- [`statsd`](#statsd)
- `prometheus`
- `m3`

#### prefix

The prefix to be applied to all outgoing metrics.

#### tags

The set of key-value pairs to be reported as part of every metric.

#### excludeTags

A map from tag name string to tag values string list.
This is useful to exclude some tags that might have unbounded cardinality.
The value string list can be used to whitelist values of that excluded tag to continue to be included.
For example, if you want to exclude `task_queue` because it has unbounded cardinality, but you still want to see a whitelisted value for `task_queue`.

#### statsd

The `statsd` sections supports the following settings:

- `hostPort`: The host:port of the statsd server.
- `prefix`: Specific prefix in reporting to `statsd`.
- `flushInterval`: Maximum interval for sending packets. (_Default_ 300ms).
- `flushBytes`: Specifies the maximum UDP packet size you wish to send. (_Default_ 1432 bytes).

#### prometheus

The `prometheus` sections supports the following settings:

- `framework`: The framework to use, currently supports `opentelemetry` and `tally`, default is `tally`. We plan to switch default to `opentelemetry` once its API become stable.
- `listenAddress`: Address for prometheus to scrape metrics from.
- `handlerPath`: Metrics handler path for scraper, default is `/metrics`.

#### m3

The `m3` sections supports the following settings:

- `hostPort`: The host:port of the M3 server.
- `service`: The service tag to that this client emits.
- `queue`: M3 reporter queue size, default is 4k.
- `packetSize`: M3 reporter max packet size, default is 32k.

### pprof

- `port`: If specified, this will initialize pprof upon process start on the listed port.

### tls

The `tls` section controls the SSL/TLS settings for network communication and contains two subsections, `internode` and `frontend`.
The `internode` section governs internal service communication among roles where the `frontend` governs SDK client communication to the Frontend Service role.

Each of these subsections contain a `server` section and a `client` section.
The `server` contains the following parameters:

- `certFile`: The path to the file containing the PEM-encoded public key of the certificate to use.
- `keyFile`: The path to the file containing the PEM-encoded private key of the certificate to use.
- `requireClientAuth`: _boolean_ - Requires clients to authenticate with a certificate when connecting, otherwise known as mutual TLS.
- `clientCaFiles`: A list of paths to files containing the PEM-encoded public key of the Certificate Authorities you wish to trust for client authentication. This value is ignored if `requireClientAuth` is not enabled.

:::tip

See the [server samples repo](https://github.com/temporalio/samples-server/tree/master/tls) for sample TLS configurations.

:::

Below is an example enabling Server TLS (https) between SDKs and the Frontend APIs:

```yaml
global:
  tls:
    frontend:
      server:
        certFile: /path/to/cert/file
        keyFile: /path/to/key/file
      client:
        serverName: dnsSanInFrontendCertificate
```

Note, the `client` section generally needs to be provided to specify an expected DNS SubjectName contained in the presented server certificate via the `serverName` field; this is needed as Temporal uses IP to IP communication.
You can avoid specifying this if your server certificates contain the appropriate IP Subject Alternative Names.

Additionally, the `rootCaFiles` field needs to be provided when the client's host does not trust the Root CA used by the server.
The example below extends the above example to manually specify the Root CA used by the Frontend Services:

```yaml
global:
  tls:
    frontend:
      server:
        certFile: /path/to/cert/file
        keyFile: /path/to/key/file
      client:
        serverName: dnsSanInFrontendCertificate
        rootCaFiles:
          - /path/to/frontend/server/CA/files
```

Below is an additional example of a fully secured cluster using mutual TLS for both frontend and internode communication with manually specified CAs:

```yaml
global:
  tls:
    internode:
      server:
        certFile: /path/to/internode/cert/file
        keyFile: /path/to/internode/key/file
        requireClientAuth: true
        clientCaFiles:
          - /path/to/internode/serverCa
      client:
        serverName: dnsSanInInternodeCertificate
        rootCaFiles:
          - /path/to/internode/serverCa
    frontend:
      server:
        certFile: /path/to/frontend/cert/file
        keyFile: /path/to/frontend/key/file
        requireClientAuth: true
        clientCaFiles:
          - /path/to/internode/serverCa
          - /path/to/sdkClientPool1/ca
          - /path/to/sdkClientPool2/ca
      client:
        serverName: dnsSanInFrontendCertificate
        rootCaFiles:
          - /path/to/frontend/serverCa
```

**Note:** In the case that client authentication is enabled, the `internode.server` certificate is used as the client certificate among services. This adds the following requirements:

- The `internode.server` certificate must be specified on all roles, even for a frontend-only configuration.
- Internode server certificates must be minted with either **no** Extended Key Usages or **both** ServerAuth and ClientAuth EKUs.
- If your Certificate Authorities are untrusted, such as in the previous example, the internode server Ca will need to be specified in the following places:

  - `internode.server.clientCaFiles`
  - `internode.client.rootCaFiles`
  - `frontend.server.clientCaFiles`

## persistence

The `persistence` section holds configuration for the data store / persistence layer.
Below is an example minimal specification for a password-secured Cluster using Cassandra.

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
        user: "username"
        password: "password"
    visibility:
      cassandra:
        hosts: "127.0.0.1"
        keyspace: "temporal_visibility"
```

The following top level configuration items are required:

### numHistoryShards

_Required_ - The number of history shards to create when initializing the Cluster.

**Warning**: This value is immutable and will be ignored after the first run.
Please ensure you set this value appropriately high enough to scale with the worst case peak load for this Cluster.

### defaultStore

_Required_ - The name of the data store definition that should be used by the Temporal server.

### visibilityStore

_Required_ - the name of the data store definition that should be used by the Temporal visibility server.

### datastores

_Required_ - contains named data store definitions to be referenced.

Each definition is defined with a heading declaring a name (ie: `default:` and `visibility:` above), which contains a data store definition.

Data store definitions must be either `cassandra` or `sql`.

#### cassandra

A `cassandra` data store definition can contain the following values:

- `hosts`: _Required_ - "," separated Cassandra endpoints, e.g. "192.168.1.2,192.168.1.3,192.168.1.4".
- `port`: Default: 9042 - Cassandra port used for connection by `gocql` client.
- `user`: Cassandra username used for authentication by `gocql` client.
- `password`: Cassandra password used for authentication by `gocql` client.
- `keyspace`: _Required_ - the Cassandra keyspace.
- `datacenter`: The data center filter arg for Cassandra.
- `maxConns`: The max number of connections to this data store for a single TLS configuration.
- `tls`: See TLS below.

#### sql

A `sql` data store definition can contain the following values:

- `user`: Username used for authentication.
- `password`: Password used for authentication.
- `pluginName`: _Required_ - SQL database type.
  - _Valid values_: `mysql` or `postgres`.
- `databaseName` - _required_ - the name of SQL database to connect to.
- `connectAddr` - _required_ - the remote address of the database, e.g. "192.168.1.2".
- `connectProtocol` - _required_ - the protocol that goes with the `connectAddr`
  - _Valid values_: `tcp` or `unix`
- `connectAttributes` - a map of key-value attributes to be sent as part of connect `data_source_name` url.
- `maxConns` - the max number of connections to this data store.
- `maxIdleConns` - the max number of idle connections to this data store
- `maxConnLifetime` - is the maximum time a connection can be alive.
- `tls` - See below.

#### tls

The `tls` and `mtls` sections can contain the following values:

- `enabled` - _boolean_.
- `serverName` - name of the server hosting the data store.
- `certFile` - path to the cert file.
- `keyFile` - path to the key file.
- `caFile` - path to the ca file.
- `enableHostVerification` - _boolean_ - `true` to verify the hostname and server cert (like a wildcard for Cassandra cluster). This option is basically the inverse of `InSecureSkipVerify`. See `InSecureSkipVerify` in http://golang.org/pkg/crypto/tls/ for more info.

Note: `certFile` and `keyFile` are optional depending on server config, but both fields must be omitted to avoid using a client certificate.

## log

The `log` section is optional and contains the following possible values:

- `stdout` - _boolean_ - `true` if the output needs to go to standard out.
- `level` - sets the logging level.
  - _Valid values_ - debug, info, warn, error or fatal, default to info.
- `outputFile` - path to output log file.

## clusterMetadata

`clusterMetadata` contains the local cluster information. The information is used in [Multi-Cluster Replication](/concepts/what-is-multi-cluster-replication).

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

- `currentClusterName` - _required_ - the name of the current cluster. **Warning**: This value is immutable and will be ignored after the first run.
- `enableGlobalNamespace` - _Default:_ `false`.
- `replicationConsumer` - determines which method to use to consume replication tasks. The type may be either `kafka` or `rpc`.
- `failoverVersionIncrement` - the increment of each cluster version when failover happens.
- `masterClusterName` - the master cluster name, only the master cluster can register/update namespace. All clusters can do namespace failover.
- `clusterInformation` - contains the local cluster name to `ClusterInformation` definition. The local cluster name should be consistent with `currentClusterName`. `ClusterInformation` sections consist of:
  - `enabled` - _boolean_ - whether a remote cluster is enabled for replication.
  - `initialFailoverVersion`
  - `rpcAddress` - indicate the remote service address (host:port). Host can be DNS name. Use `dns:///` prefix to enable round-robin between IP address for DNS name.

## services

The `services` section contains configuration keyed by service role type.
There are four supported service roles:

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
      bindOnIP: "0.0.0.0"
```

There are two sections defined under each service heading:

### rpc

_Required_

`rpc` contains settings related to the way a service interacts with other services. The following values are supported:

- `grpcPort` is the port on which gRPC will listen.
- `membershipPort`: Port used to communicate with other hosts in the same Cluster for membership info.
  Each service should use different port.
  If there are multiple Temporal Clusters in your environment (Kubernetes for example), and they have network access to each other, each cCluster should use different membershipPort.
- `bindOnLocalHost`: Determines whether uses `127.0.0.1` as the listener address.
- `bindOnIP`: Used to bind service on specific IP, or `0.0.0.0`.
  Check `net.ParseIP` for supported syntax, only IPv4 is supported, mutually exclusive with `BindOnLocalHost` option.

**Note**: Port values are currently expected to be consistent among role types across all hosts.

## publicClient

The `publicClient` a required section describing the configuration needed to for worker to connect to Temporal server for background server maintenance.

- `hostPort` IPv4 host port or DNS name to reach Temporal frontend, [reference](https://github.com/grpc/grpc/blob/master/doc/naming.md)

Example:

```yaml
publicClient:
  hostPort: "localhost:8933"
```

Use `dns:///` prefix to enable round-robin between IP address for DNS name.
