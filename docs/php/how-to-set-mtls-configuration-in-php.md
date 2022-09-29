---
id: how-to-set-mtls-configuration-in-php
title: How to set mTLS configuration in PHP
sidebar_label: Set mTLS configuration
description: To set the mTLS configuration in PHP, use `ServiceClient::createSSL()` to connect to a Temporal Client with mTLS.

tags:
  - developer-guide
  - sdk
  - php
---

To start using mTLS with Temporal you need to add `tls` option to RoadRunner config file and provide paths 
to certificates:

```yaml
  tls:
    key: 'certs/client.key'
    cert: 'certs/client.pem'
    root_ca: 'certs/ca.cert'
    client_auth_type: require_and_verify_client_cert
    server_name: 'tls-sample'
```

Then update the application where you create `WorkflowClient` and use ssl connection for `ServiceClient`:

```php
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

[The Hello World mTLS sample](https://github.com/temporalio/samples-php/pull/24/files/) demonstrates sample code with Mtls connection.
1. Set up Temporal Server with mTLS encryption locally
    - Clone the [server samples repo](https://github.com/temporalio/samples-server/) and change to the `tls/tls-simple` directory
    - Follow [these instructions](https://github.com/temporalio/samples-server/tree/master/tls/tls-simple#readme) to set up a local server with mTLS
    - The sample does not register the default Namespace on startup, register it with: `docker exec -it tls-simple-temporal-admin-tools-1 tctl n re --retention 1 default`
2. Start RoadRunner with tls config file: `./rr serve -c src/MtlsHelloWorld/.rr.yaml`
3. Run the application `php src/MtlsHelloWorld/app.php`
