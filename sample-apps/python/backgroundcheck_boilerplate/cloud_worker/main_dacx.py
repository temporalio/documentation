import asyncio
import os

from temporalio.client import Client, TLSConfig
from temporalio.worker import Worker

from activities.ssntraceactivity_dacx import ssn_trace_activity
from workflows.backgroundcheck_dacx import BackgroundCheck

"""dacx
A Temporal Cloud Worker requires that you specify the following in the Client connection options:

- Temporal Cloud Namespace
- Temporal Cloud Address
- Certificate and private key associated with the Namespace
dacx"""


async def main():
    with open(os.getenv("TEMPORAL_MTLS_TLS_CERT"), "rb") as f:
        client_cert = f.read()

    with open(os.getenv("TEMPORAL_MTLS_TLS_KEY"), "rb") as f:
        client_key = f.read()

    client = await Client.connect(
        os.getenv("TEMPORAL_HOST_URL"),
        namespace=os.getenv("TEMPORAL_NAMESPACE"),
        tls=TLSConfig(
            client_cert=client_cert,
            client_private_key=client_key,
        ),
    )

    worker = Worker(
        client,
        task_queue="backgroundcheck-boilerplate-task-queue",
        workflows=[BackgroundCheck],
        activities=[ssn_trace_activity],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())

"""dacx
 To run a Temporal Cloud Worker, you'll change some parameters in your Client connection code, such as updating the namespace and gRPC endpoint.
 You'll use:
 
 - The [Temporal Cloud Namespace Id](https://docs.temporal.io/cloud/namespaces#temporal-cloud-namespace-id).
 - The [Namespace's gRPC endpoint](https://docs.temporal.io/cloud/namespaces#temporal-cloud-grpc-endpoint).
 The endpoint uses this format `(namespace.unique_id.tmprl.cloud:port)`.
 - [Paths to the SSL certificate (.pem) and private key (.key)](https://docs.temporal.io/cloud/saml#integrate-saml-with-your-temporal-cloud-account) registered to your Namespace and stored on your Worker's file system.
 
 Copy the Namespace Id and the gRPC endpoint from the Namespace detail Web page on [Temporal Cloud Namespaces](https://cloud.temporal.io/namespaces). Click on a Namespace name to open the Namespace details.
 
 For information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](https://docs.temporal.io/cloud/certificates#issue-certificates).
 
 For information about configuring TLS to secure inter- and intra-network communication for a Temporal Service, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).
 
 ![Copy your gRPC endpoint from the UI](/img/copy-grpc-endpoint.png)
dacx"""

""" @dacx
id: backgroundcheck-boilerplate-cloud-worker
title: Run a Temporal Cloud Worker
description: Provide your Namespace, Address, and certificate key pair to connect to Temporal Cloud.
label: Cloud Worker
lines: 1-46
tags:
- worker
- temporal cloud
- developer guide
- temporal client
@dacx """

""" @dacx
id: backgroundcheck-boilerplate-cloud-worker-details
title: Cloud Worker details
description: When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
label: Cloud Worker details
lines: 47-54
tags:
- worker
- cloud certificate
@dacx """
