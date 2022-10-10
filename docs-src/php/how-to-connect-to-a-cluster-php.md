---
id: how-to-connect-to-a-cluster-php
title: How to connect to a Cluster in PHP
sidebar_label: Connect to a Cluster
---

Create an instance of the `$workflowClient` class and use the `create()` method to connect a Temporal Client to a Temporal Cluster.

Specify the target host, `localhost:7223`, parameter as a string and provide the TLS configuration for connecting to a Temporal Cluster.

```php
use Temporal\Client\GRPC\ServiceClient;
use Temporal\Client\WorkflowOptions;
# . . .
$workflowClient = Temporal\Client\WorkflowClient::create(
     ServiceClient::createSSL(
         'localhost:7233',
         'certs/ca.cert',
         'certs/client.key',
         'certs/client.pem',
         'tls-sample',
     ),
 );
```

To provide the client options as an environmental variable, add the `tls` option to the RoadRunner configuration file and pass the path to the file.

```yml
temporal:
  # . . .
  tls:
    key: "certs/client.key"
    cert: "certs/client.pem"
    root_ca: "certs/ca.cert"
    client_auth_type: require_and_verify_client_cert
    server_name: "tls-sample"
```

Then update your application and use the SSL connection for `ServiceClient`.

```php
$workflowClient = Temporal\Client\WorkflowClient::create(
     ServiceClient::createSSL(
         'localhost:7233',
         getenv('TEMPORAL_SERVER_ROOT_CA_CERT_PATH'),
         getenv('TEMPORAL_CLIENT_KEY_PATH'),
         getenv('TEMPORAL_CLIENT_CERT_PATH'),
         getenv('TEMPORAL_SERVER_NAME_OVERRIDE')
     ),
 );
```
