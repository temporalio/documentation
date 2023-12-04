---
id: cloud-ops-api
title: Cloud Operations API
sidebar_label: Cloud Ops API
description: The Temporal Cloud Operations API (Cloud Ops API) manages the automation of Users, Namespaces, and Temporal Cloud Accounts.
tags:
  - explanation
ssdi:
  - API Keys is a in Public Preview for Temporal Cloud.
---

The Temporal Cloud Operations API (Cloud Ops API) is a library for managing the automation of Users, Namespaces, and Temporal Cloud Accounts.

Cloud Ops API is an open-source, public gRPC API, library to compile and generate code in your desired programming language.

## Overview

You can manage Temporal Cloud resources programmatically using the Cloud Operations API, complementing the Temporal Cloud CLI (tcld).
The Cloud Ops API, streamlines the automation of User, Namespace, and Account management tasks.
Utilize gRPC protos, which compile into any language, for flexible integration.
Authenticate using Temporal Cloud API Keys; for key management details, refer to [this guide](/cloud/api-keys).

## Getting Started

Begin by ensuring your registration as a Temporal Cloud user.
If you're not yet a user, [sign up here](https://pages.temporal.io/get-started-with-cloud).

Explore API functionalities through [Go language samples](https://github.com/temporalio/cloud-samples-go) showcasing Cloud Ops API usage.

**Prerequisites:**

This process assumes you have basic familiarity with gRPC and Protocol Buffers (protobuf).

- [Temporal Cloud user account](/cloud/get-started)
- [API Key](/cloud/tcld/apikey/create) for authentication
- [Protocol Buffers](https://github.com/protocolbuffers/protobuf/releases)

### Compile the API

Download the gRPC protobufs from the [Cloud Ops API repository](https://github.com/temporalio/api-cloud/tree/main/temporal/api/cloud).

Use [grpc](https://grpc.io/docs/) to compile and generate code in your preferred [programming language](https://grpc.io/docs/#official-support).

1. **Clone the Temporal Cloud API repository:**
   ```command
   git clone https://github.com/temporalio/api-cloud.git
   cd api-cloud
   ```

2. **Copy Protobuf files:**
   - Navigate to the `temporal` directory.
   - Copy the protobuf files to your project directory.

3. **Compile the Protobuf files:**
   1. The following is an example of how to use the generated code for Python; however, this approach can be adapted for other supported programming languages:
   ```python
   python -m grpc_tools.protoc -I./ --python_out=./ --grpc_python_out=./ *.proto
   ```
   - `-I./` specifies the directory of the `.proto` files.
   - `--python_out=./` sets the output directory for generated Python classes.
   - `--grpc_python_out=./` sets the output directory for generated gRPC service classes.
   - `*.proto` processes all `.proto` files.

## Use the generated code

After compiling the Protobuf files, you will have generated code files in your project directory.
These files enable interaction with the Temporal Cloud API in your chosen programming language.

The following is an example of how to use the generated code for Python; however, this approach can be adapted for other programming languages:

1. **Import the Generated Files:**
   - Locate the Python files (.py) generated in your project directory.
   - Import these files into your Python application where you intend to interact with the Temporal Cloud API.

2. **Utilize the API:**
   - Use the classes and methods defined in the imported files to communicate with the Temporal Cloud services.
   - Ensure to handle any required authentication or configuration as needed for Temporal Cloud.

This approach can be adapted for other programming languages by following their respective import and usage conventions for the generated code files.

### Using the API

When interacting with the Temporal Cloud Ops API, follow these guidelines:

1. **API Version Header:**
   - Always include the `temporal-cloud-api-version` header in your requests, specifying the API version identifier.
   - The current API version can be found [here](https://github.com/temporalio/api-cloud/blob/main/VERSION#L1C1-L1C14).

2. **Connection URL:**
   - Connect to the Temporal Cloud using the gRPC URL: `saas-api.tmprl.cloud:443`.

3. **Engagement Steps:**
   - **Generate API Key:**
     - Obtain an API Key for authentication. Note that many operations may require Admin privileges.
   - **Set Up Client:**
     - Establish a secure connection to the Temporal Cloud. Refer to the example [Client setup in Go](https://github.com/temporalio/cloud-samples-go/blob/main/client/temporal/client.go) for guidance.
   - **Execute Operations:**
     - For operation specifics, refer to the `cloudservice/v1/request_response.proto` for gRPC messages and `cloudservice/v1/service.proto` for gRPC services.

These steps provide a structured approach to utilizing the Temporal Cloud Ops API effectively, ensuring proper authentication and connection setup.

### Provide feedback

Your input is valuable.
While the Temporal Cloud Ops API is in Public Preview, we welcome your feedback.

You can provide feedback through the following channels:

- Submit request or feedback through a ZenDesk [ticket](/cloud/support#support-ticket)
- Open an issue in the [GitHub Repo](https://github.com/temporalio/cloud-ops-api)
