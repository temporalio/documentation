---
id: datadog
title: DataDog
description: DataDog
sidebar_label: DataDog
tags:
  - how-to
  - observability
  - metrics
  - datadog
  - temporal cloud
---

Exporting cloud metrics to DataDog provides enhanced observability, allowing you to monitor, alert, and visualize key performance indicators of your applications and infrastructure in real-time.
Temporal's integration with DataDog makes it seamless to extend the monitoring capabilities of your Temporal Cloud deployment.

### What will you learn?

You will set up your environment to export metrics from Temporal Cloud to DataDog, including:

- Preparing your environment with the necessary prerequisites
- Configuring certificates for secure communication
- Deploying the integration using Helm and Minikube
- Verifying the setup to ensure metrics are being exported correctly

## Prerequisites

Before you begin, ensure you have the following:

- A DataDog account with an **API Key**. [Get it here](https://app.datadoghq.com/account/settings#api).
- A **Temporal Cloud** account. Sign up [here](https://cloud.temporal.io/).
- **Helm** installed for managing Kubernetes applications. [Installation guide](https://helm.sh/docs/intro/install/).
- **K9s** for Kubernetes CLI UI management. [GitHub repository](https://github.com/derailed/k9s).
- **Minikube** for running a local Kubernetes cluster. [Start here](https://minikube.sigs.k8s.io/docs/start/).
- **GitHub** account for accessing repositories. [Sign up here](https://github.com/).

## Step 1. Setting up the GitHub project

Temporal provides a script demonstrating the minimum work necessary to read recently generated metrics from a Temporal Cloud account using the Prometheus API and import them into DataDog while handling some common edge and error cases.

The following tutorial uses the [Prometheus Querying Language to DataDog in Go](https://github.com/temporalio/samples-server/tree/main/cloud/observability/promql-to-dd-go) (PromQL); however, you can use and customize this code and others to suit your needs.
Support for other languages include:

- [PromQL to DataDog in Python](https://github.com/temporalio/samples-server/blob/main/cloud/observability/README.md)
- [PromQL to Datadog in Typescript](https://github.com/temporalio/samples-server/tree/main/cloud/observability/promql-to-dd-ts)

Clone the `promql-to-dd-go` directory from the Temporal samples server and navigate into it:

```bash
gh repo clone temporalio/samples-server
cd samples-server/cloud/observability/promql-to-dd-go
```

:::note

These examples are provided as-is, without support.
They are intended as reference material only.

:::

Metrics are exported on a per-account basis.

## Step 2. Setting up your certificates

Choose a method for generating certificates.
You can use one of the methods provided, or if your organization has its own certification manager, use that.

These certificates are used to communicate with Your Temporal Cloud account.
For more information on certifications and Temporal Cloud, see [Certificate management](/cloud/certificates).

### Using **tcld**

Use the tcld to authenticate, generate, and add certificates to your Cloud account.

1. **Login**: Authenticate with your Temporal Cloud account.
   ```bash
   tcld login
   ```
2. **Create certs**: Generate the necessary certificates for secure communication.
   ```bash
   tcld generate-certificates certificate-authority-certificate --org ${ACCOUNT_ID} -d 1y --ca-cert ca.pem --ca-key ca.key
   ```
3. **Add certificates to Cloud account**: Ensure your Temporal Cloud Namespace is configured with the generated certificates.
   ```bash
   tcld namespace accepted-client-ca add --ca-certificate-file ca.pem
   ```

Replace `${ACCOUNT_ID}` with your Temporal Cloud account ID.
This is the assigned account identifier.

### Using **certstrap**

You can also use certification managers like certstrap.

1. Follow the [certstrap README](https://github.com/square/certstrap) to download and install certstrap.
2. Create a new certificate authority with `certstrap init --common-name CertAuth`.
3. Request a certificate key pair with `certstrap request-cert --common-name metrics-cert`.
4. Sign the certificate request to generate the end-entity certificate with `certstrap sign metrics-cert --CA CertAuth`.
5. Locate your newly created certificates in the 'out' folder within the certstrap directory and follow this guide.

:::note
Certificate names must be unique per account.
:::

### Verifying certificates setup

Test your setup with the following command:

```bash
curl --cert ca.pem --key ca.key "https://<Organization_ID>.tmprl.cloud/prometheus/api/v1/query?query=temporal_cloud_v0_state_transition_count" | jq .
```

Expect a successful response indicating your setup is correct.

```json
{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "__name__": "temporal_cloud_v0_state_transition_count",
          "__rollup__": "true",
          "operation": "WorkflowContext",
          "temporal_namespace": "namespace.id",
          "temporal_service_type": "history"
        },
        "value": [
          123456.789,
          "12"
        ]
      }
    ]
  }
}
```

## Step 3. Running Helm and Minikube

Use the following commands to run **Minikube** and **Helm** in your environment:

1. **Start Minikube**:

```bash
minikube start
```

2. **Deploy with Helm**:

Set your environment variables for the DataDog API key and Temporal account ID, then deploy using Helm:

```bash
helm install promqltodd . \
  --set prom_endpoint=https://${ACCOUNT_ID}.tmprl.cloud/prometheus \
  --set dd_api_key=${DD_API_KEY} \
  --set query_interval_seconds=15 \
  --set-file 'ca_cert=../out/metrics-cert.crt' \
  --set-file 'ca_key=../out/metrics-cert.key'
```

Run the following command:

- Set your Temporal account id.
- Export your DataDog API Key.

You'll see an output indicating successful deployment:

```bash
NAME: promqltodd
LAST DEPLOYED: [Deployment Time]
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Thank you for installing promql-to-dd-go.
```

### Deploy K9s

Finally, start your **K9s** instance to monitor the deployment:

```bash
k9s
```

Review the logs to confirm the integration is functioning as expected.

You can use a [pre-built dashboard](https://github.com/temporalio/samples-server/blob/main/cloud/observability/promql-to-dd-go/examples/datadog_dashboard.json) to visualize your metrics in DataDog.

## Conclusion

You've successfully set up the export of metrics from Temporal Cloud to DataDog.
This integration enables you to leverage DataDog's comprehensive observability platform to monitor your Temporal Cloud metrics, providing insights into your workflows and operations.

This is just the start.
Customize and extend this code to meet your needs.

### Next steps

- Explore DataDog dashboards to visualize your Temporal metrics.
- Set up alerts in DataDog based on the metrics received from Temporal Cloud.
- Consider integrating additional observability tools or exporting metrics to other platforms as needed.
