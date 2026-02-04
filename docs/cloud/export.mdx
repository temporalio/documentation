---
id: export
title: Workflow History Export
sidebar_label: Workflow History Export
description: Workflow History Export in Temporal Cloud lets users export Closed Workflow Histories to an object storage for compliance and analytics. Configure via Cloud UI or tcld.
slug: /cloud/export
toc_max_heading_level: 4
keywords:
  - archival
  - export
  - operations
  - temporal cloud
  - verify
  - workflow history export
tags:
  - Temporal Cloud
  - Export Workflow History
---

Workflow History Export allows users to export closed Workflow Histories from Temporal Cloud to cloud object storage (AWS S3 or GCP GCS), enabling:

- Compliance and audit trails of complete Workflow History data in [proto format](https://github.com/temporalio/api/blob/master/temporal/api/export/v1/message.proto)
- Analytics on Workflow History when ingested to the data platform of your choice

Workflow History Export in Temporal Cloud provides similar functionality as [Archival](/self-hosted-guide/archival) in a Self-Hosted Temporal Server. 
Archival is not supported in Temporal Cloud.

Exports run hourly, beginning 10 minutes after the hour. 
Allow up to 24 hours for a closed Workflow to appear in the exported file.
Delivery is guaranteed at least once.


## Prerequisites {#prerequisites}

To use Workflow History Export, you must have:

1. A cloud account in the cloud provider where your Namespace is hosted.
2. An object storage bucket available to receive the exported History.

## Configure Workflow History Export {#configure}

### AWS

[AWS S3 Export Configuration](/cloud/export/aws-export-s3)

### GCP

[GCP GCS Export Configuration](/cloud/export/gcp-export-gcs)

## Verify export setup {#verify}

From the Export configuration page, select **Verify**.
This validates that Temporal can successfully write a test file to your object storage.

If everything is configured correctly, you will see a `Success` status indicating Temporal has written to the object store.

## Monitor export progress {#monitor}

After Export has been configured, you can check that it's still working in several ways:

1. **Object Storage**:

   - File Delivery: After the initial hour of setting up, inspect your object storage.
     You should see the exported Workflow History files.
   - Directory Structure: Your exported files will adhere to the following naming convention and path:

   ```bash
   //[bucket-name]/temporal-workflow-history/export/[Namespace]/[Year]/[Month]/[Day]/[Hour]/[Minute]/
   ```
The exported file name will include a randomly generated ID. The time recorded in the directory structure
is the time the export uploads to object storage, not the Workflow completion time.

2. **Temporal Cloud Web UI**:

   - Export UI:

      - Last Successful Export: This displays the timestamp of the most recent successful export.
      - Last Status Check: This reflects the timestamp of the latest internal Workflow healthcheck.

   - Usage Dashboard:
      - Actions from the Export Job are included in the [Usage Dashboard](/cloud/billing-and-cost).

3. **Metrics**:
   - Export-related metrics are available from the [Cloud metrics endpoint](/cloud/metrics/), specifically the metric `temporal_cloud_v1_total_action_count` with the label `is_background="true"`.

4. **Email**:
   - Emails are sent to `Namespace Administrator`, `Account Owner`, and `Global Administrator` roles when a Workflow History Export job fails due to a user related error (such as Object Store permissions issue).

## Working with exported files

Use the proto schema defined [here](https://github.com/temporalio/api/blob/master/temporal/api/export/v1/message.proto) to deserialize exported files.

### Using exported files in analytics

It can be useful to convert protos to another format to perform analytics on the data. To convert protos to parquet, follow 
[the example Python Workflow](https://github.com/temporalio/samples-python/tree/main/cloud_export_to_parquet). Note that this example Workflow:
* Transforms the nested proto structure into a flat, tabular format.
* Each row in the table represents a single history event from a Workflow. To preserve their relationship post-conversion, the `workflowID` and `runID` is included in every row.
* If you have enabled the codec server, the payload field is encrypted. This field may contain characters that are not recognized when loaded into a database so the payload field is excluded in this example.

## Export and High Availability Namespaces {#export-ha}

### Export Region Persistence

When Export is configured for a [High Availability](/cloud/high-availability) Namespace, the export is tied to the specific region where it was initially set up. The export configuration does not automatically failover with the Namespace.

- If Export is configured in Region A, it will continue to export from Region A's storage even after a Namespace failover to Region B
- Exports always read from and write to the same region where they were originally configured
- The export process is independent of Namespace failover events
- Export does not fail over automatically because we prioritize data completeness and consistency over real-time availability for exports. HA data replication has inherent latency, which could result in incomplete or inconsistent exports during a failover.

### Failover Scenarios

**Namespace Failover with Healthy Primary Region**: When a Namespace fails over to a secondary region but the primary region remains healthy (including its blob storage), the export job continues to operate from the primary region. It does not automatically switch to export data from the secondary region.

**Primary Region Outage**: If the primary region (where Export was configured) experiences a complete outage including S3/GCS storage: Exports will be unavailable until the primary region recovers. Once the primary region recovers, export will resume and include any Workflow histories that occurred during the outage. There may be delays in export processing, but the complete dataset will eventually be available. It does not automatically switch to export data from the secondary region.
