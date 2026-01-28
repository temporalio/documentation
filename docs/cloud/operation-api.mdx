---
id: operation-api
title: Cloud Ops API
sidebar_label: Cloud Ops API
description: The Temporal Cloud Operations API (Cloud Ops) allows programmatic management of Temporal Cloud control plane resources.
slug: /ops
toc_max_heading_level: 4
keywords:
  - explanation
tags:
  - API
  - Temporal Cloud
---

:::tip Support, stability, and dependency info

The Temporal Cloud Operations API is in [Public Preview](/evaluate/development-production-features/release-stages#public-preview).

:::

The Temporal Cloud Operations API, or the Cloud Ops API, is an open source, public [HTTP API](https://saas-api.tmprl.cloud/docs/httpapi.html#description/introduction) and [gRPC API](https://github.com/temporalio/cloud-api/tree/main) for programmatically managing Temporal Cloud control plane resources, including [Namespaces](/cloud/namespaces), [Users](/cloud/users), [Service Accounts](/cloud/service-accounts), [API keys](/cloud/api-keys), and others. The Temporal Cloud [Terraform Provider](/cloud/terraform-provider), [tcld CLI](/cloud/tcld), and Web UI all use the Cloud Ops API.

## Develop applications with the Cloud Ops API

You can use the HTTP API or the gRPC API depending on how you need to integrate with your platform. The URL to access both the HTTP and gRPC Cloud Ops API is `saas-api.tmprl.cloud`.

### Prerequisites

These prerequisites are required for using either HTTP or gRPC.

- [Temporal Cloud user account](/cloud/get-started)
- [API Key](/cloud/tcld/apikey#create) for authentication

### Use cases

Some common reasons you might use the API are to:

- Provision Namespaces per environment or tenant via pipelines.
- Bootstrap new projects by creating users, assigning roles, and creating Namespaces via custom scripts.
- Rotate service account keys on a schedule with a job.
- Audit and report access across orgs with scheduled HTTP requests.

### Using HTTP

[The HTTP API](https://saas-api.tmprl.cloud/docs/httpapi.html#description/introduction) supports the same operations as the [gRPC API](#using-grpc), but it's usable via standard HTTP methods and authentication. This may be a more convenient option if you are writing automation scripts for CI/CD or you can't use gRPC due to network policies, proxies, tooling gaps, or language/runtime constraints. Since it's standard HTTP, it's language agnostic giving you the ability to run cloud operations consistently.

:::note
This *does not* allow interaction with individual Workflows or Activities via HTTP.
:::

### Using gRPC

*For Go developers:*
- Use the [Go SDK](https://github.com/temporalio/cloud-sdk-go) for the simplest setup experience

*For other programming languages:*
- Basic familiarity with gRPC and Protocol Buffers (protobuf)
- [Protocol Buffers](https://github.com/protocolbuffers/protobuf/releases)
- [gRPC](https://grpc.io/docs/languages/) in your preferred programming language

You can use the provided proto files to generate client libraries in your desired programming language, and then use that client to access the gRPC API. You can also find the [full gRPC docs on Buf](https://buf.build/temporalio/cloud-api/docs/main:temporal.api.cloud.cloudservice.v1#temporal.api.cloud.cloudservice.v1.CloudService).

#### Using the Go SDK

If you're developing in Go, we recommend using the [Go SDK](https://github.com/temporalio/cloud-sdk-go) which provides pre-compiled Go bindings and a more idiomatic interface. The Go SDK handles all the protobuf compilation and provides ready-to-use Go types and client interfaces. You can also use the [Go samples](https://github.com/temporalio/cloud-samples-go) to help you get started with the Cloud Ops API using the Go SDK.

To start using the Go SDK with the Cloud Ops API, follow these steps:

1. Install the Go SDK:
   ```go
   go get github.com/temporalio/cloud-sdk-go
   ```

2. Import and use the SDK:
   ```go
   import (
       "github.com/temporalio/cloud-sdk-go/client"
   )
   ```

3. The Go SDK provides pre-built client interfaces that handle authentication and connection setup. Refer to the [Go samples](https://github.com/temporalio/cloud-samples-go) for detailed usage examples.

The Go SDK eliminates the need to work directly with generated protobuf files and provides a more idiomatic Go experience.

#### Compile the API and use the generated code (For other languages)

For programming languages other than Go, download the gRPC protobufs from the [Cloud Ops API repository](https://github.com/temporalio/cloud-api/tree/main/temporal/api/cloud) and compile them manually.

Use [gRPC](https://grpc.io/docs/) to compile and generate code in your preferred [programming language](https://grpc.io/docs/#official-support). The steps below use Python as an example and require [Python's gRPC tools](https://grpc.io/docs/languages/python/quickstart/#grpc-tools) to be installed, but the approach can be adapted for other supported programming languages.

1. Clone the Temporal Cloud API repository:

   ```command
   git clone https://github.com/temporalio/cloud-api.git
   cd cloud-api
   ```

2. Copy Protobuf files:

   - Navigate to the `temporal` directory.
   - Copy the protobuf files to your project directory.

3. Compile the Protobuf files:

   ```python
   python -m grpc_tools.protoc -I./ --python_out=./ --grpc_python_out=./ *.proto
   ```
   - `-I` specifies the directory of the `.proto` files.
   - `--python_out=` sets the output directory for generated Python classes.
   - `--grpc_python_out=` sets the output directory for generated gRPC service classes.
   - `*.proto` processes all `.proto` files.

   After compiling the Protobuf files, you will have generated code files in your project directory.
   These files enable interaction with the Temporal Cloud API in your chosen programming language.

4. Import the Generated Files:

   - Locate the Python files (.py) generated in your project directory.
   - Import these files into your Python application where you intend to interact with the Temporal Cloud API.

2. Use the API:
   - Use the classes and methods defined in the imported files to communicate with the Temporal Cloud services.
   - Ensure to handle any required authentication or configuration as needed for Temporal Cloud.

This approach can be adapted for other programming languages by following their respective import and usage conventions for the generated code files.

## Usage guidelines

When interacting with the Temporal Cloud Ops API, follow these guidelines:

- API version header:
   - Always include the `temporal-cloud-api-version` header in your requests, specifying the API version identifier.
   - The current API version can be found [here](https://github.com/temporalio/cloud-api/blob/main/VERSION#L1C1-L1C14).
- Connection URL:
   - Connect to the Temporal Cloud using the gRPC URL: `saas-api.tmprl.cloud:443`.
- Engagement steps:
   - Generate API key:
     - Obtain an [API Key for authentication](/cloud/api-keys#manage-api-keys). Note that many operations may require Admin privileges.
   - Set up client:
     - Establish a secure connection to the Temporal Cloud. Refer to the example [Client setup in Go](https://github.com/temporalio/cloud-samples-go/blob/main/client/temporal/client.go) for guidance.
   - Execute operations:
     - For operation specifics, refer to the `cloudservice/v1/request_response.proto` for gRPC messages and `cloudservice/v1/service.proto` for gRPC services.

These steps provide a structured approach to using the Temporal Cloud Ops API effectively, ensuring proper authentication and connection setup.

## Rate limits

The Temporal Cloud Operations API implements rate limiting to ensure system stability and fair usage across all users. Rate limits are applied based on identity type, with different limits for users and service accounts.

### Account-level rate limit

**Total rate limit: 160 requests per second (RPS)**

This limit applies to all requests made to the Temporal Cloud control plane by any client (tcld, UI, Cloud Ops API) or identity type (user, service account) within your account. The total account throughput cannot exceed the limit regardless of the number of users or service accounts making requests.

### Per-identity rate limits

**User rate limit: 40 RPS per user**

This limit applies to all requests made by each user through any client (tcld, UI, Cloud Ops API), regardless of the authentication method used (SSO or API keys).

**Service account rate limit: 80 RPS per service account**

This limit applies to all requests made by each service account through any client (tcld, Cloud Ops API).

### Important considerations

- Rate limits are enforced across all Temporal Cloud control plane operations
- Multiple clients used by the same identity (user or service account) share the same rate limit
- Authentication method (SSO, API keys) does not affect rate limiting
- These limits help ensure system stability and prevent any single account or identity from overwhelming the service

### Request limit increases

If your use case requires higher rate limits, you can request an increase by [submitting a support ticket](/cloud/support#support-ticket). When requesting a limit increase, please provide:

- Your current usage patterns and requirements
- The specific limits you need increased
- A description of your use case and why higher limits are necessary

### Provide feedback

Your input is valuable!

You can provide feedback through the following channels:

- Submit request or feedback through a [support ticket](/cloud/support#support-ticket)
- Open an issue in the [GitHub Repo](https://github.com/temporalio/cloud-api)
