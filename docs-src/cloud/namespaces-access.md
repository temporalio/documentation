---
id: namespaces-access
title: How to access a Namespace in Temporal Cloud
sidebar_label: Access Namespaces
description: You can access a Namespace in Temporal Cloud via gRPC and HTTPS endpoints.
tags:
  - how-to
  - namespaces
  - temporal cloud
---

<!--- How to access a Namespace in Temporal Cloud --->

Each Namespace in Temporal Cloud has two unique endpoints, both of which include the [Namespace Id](/concepts/what-is-a-cloud-namespace-id).

- For programmatic access, a gRPC endpoint in the form `<NamespaceId>.tmprl.cloud`; for example, `accounting-production.f45a2.tmprl.cloud:7233`.
- For accessing Temporal Web UI, an HTTPS endpoint in the form `https://cloud.temporal.io/namespaces/<namespaceId>`; for example, `https://cloud.temporal.io/namespaces/accounting-production.f45a2`.

To ensure the security of your data, all traffic to and from your Namespace is [encrypted](cloud/security-cloud-platform).
However, for enhanced protection, you have additional options:

- (recommended} Set up [PrivateLink](https://aws.amazon.com/privatelink/) by [creating a ticket for Temporal Support](/cloud/support-create-ticket).
  If you don't host your Clients and Workers on AWS, you can create an AWS account to proxy traffic through.
- Allow list, for outgoing network requests from your Clients and Workers, the [IP address ranges](https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html) of the AWS region in which your Namespace is located.
