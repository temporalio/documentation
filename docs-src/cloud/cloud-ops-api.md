---
id: cloud-ops-api
title: Cloud Operations API
sidebar_label: Cloud Ops API
description: The Temporal Cloud Operations API (Cloud Ops API) manages the automation of Users, Namespaces, and Temporal Cloud Accounts.
tags:
  - explanation
ssdi:
  - The Cloud Operations API is a new feature for Temporal Cloud. It is being released as a Public Preview.
---

The Temporal Cloud Operations API (Cloud Ops API) is a library for managing the automation of Users, Namespaces, and Temporal Cloud Accounts.

Cloud Ops API is an open-source, public gRPC API, library to compile and generate code in your desired programming language.

## Overview

You can manage Temporal Cloud resources programmatically using the Cloud Operations API, complementing the Temporal Cloud CLI (tcld).
The Cloud Ops API, streamlines the automation of User, Namespace, and Account management tasks.
Utilize gRPC protos, which compile into any language, for flexible integration.
Authenticate using Temporal Cloud API Keys; for key management details, refer to [this guide](https://temporal.io/cloud/api-keys-management).

## Getting Started

Begin by ensuring your registration as a Temporal Cloud user.
If you're not yet a user, **[sign up here](https://pages.temporal.io/get-started-with-cloud)**.

Explore API functionalities through [Go language samples](https://github.com/temporalio/cloud-samples-go) showcasing Cloud Ops API usage.

**Prerequisites:**

- Temporal Cloud user account
- [API Key](/cloud/tcld/apikey/create) for authentication

### Compile the API

Download the gRPC protobufs from the [Cloud Ops API repository](https://github.com/temporalio/api-cloud/tree/main/temporal/api/cloud). Then, use [grpc](https://grpc.io/docs/) to compile and generate code in your chosen programming language.

### Using the API

Follow these steps to engage with the Cloud Ops API:

1. Generate an API Key, noting that many operations require Admin privileges.
2. Establish a [Client](https://github.com/temporalio/cloud-samples-go/blob/main/client/temporal/client.go) to securely connect to Temporal Cloud using your API Key.
3. Execute operations. Find operation gRPC messages in `cloudservice/v1/request_response.proto` and the operation gRPC services in `cloudservice/v1/service.proto`.

### Provide Feedback

Your input is valuable.

Submit requests or feedback through a ZenDesk ticket or by opening an issue in the [GitHub Repo](https://github.com/temporalio/cloud-ops-api).
