Specify a host and optional port.
Host defaults to: `127.0.0.1`
Port defaults to: `7233`

Your address will be in the following form: `web.<Namespace_ID>.tmprl.cloud`

Note the difference between the gRPC and Temporal Web endpoints:

- The gRPC endpoint has a DNS address of `<Namespace_ID>.tmprl.cloud`; for example, `accounting-production.f45a2.tmprl.cloud`.
- The Temporal Web endpoint is `web.<Namespace_ID>.tmprl.cloud`; for example, `https://web.accounting-production.f45a2.tmprl.cloud`.
