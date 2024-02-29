---
id: how-to-monitor-export-progress
title: Monitor export progress
sidebar_label: Monitor
description: Track of the progress of your Workflow History Exports in Temporal Cloud.
tags:
  - temporal cloud
  - workflow history export
  - how-to
---

**How to monitor the History export progress**

Once you've finalized the setup, here's how to monitor the export progress:

1. **Export Job Execution**:
   - **Schedule**: The Export job is scheduled to run on an hourly basis, starting at 10 minutes past each hour.
   - **Duration**: The time taken for the export process can vary based on the amount of data, so it may not be instantaneous.

2. **Checking the S3 Bucket**:
   - **Files Arrival**: Post the initial hour of setting up, inspect your S3 bucket.
     You should see the exported Workflow History files.
     These files encapsulate the relevant data from the Closed Workflows.
   - **Directory Structure**: Your exported files will adhere to the following naming convention and path:

   ```command
   s3://[bucket-name]/temporal-workflow-history/export/[Namespace]/[Year]/[Month]/[Day]/[Hour]/[Minute]/
   ```

3. **Delivery guarantee**:
   - At least once delivery.
   - Each Closed Workflow is expected to be found in the exported file within one to four hours.

4. **UI insights**:
   - **Last Successful Export**: This displays the timestamp of the most recent successful export.
     It's an essential indicator of the last time your export process completed without any hitches.
   - **Last Status Check**: This reflects the timestamp of the latest internal Workflow check.
     This internal check routinely evaluates the health and status of the Export mechanism, ensuring its uninterrupted functioning.

5. **Usage monitoring**:
   - Actions from the Export Job are included on the Usage UI.
   - **Metrics**: Export related metrics are available in `temporal_cloud_v0_total_action_count` with the label `is_background`. For more information, see [Cloud metrics](/cloud/metrics-intro).

For optimal results, review the S3 bucket for any new exported files and refer to the UI insights.
This dual check ensures you remain abreast of the export progress and any potential issues.

<!--  starting on `2024/03/01` UTC actions are charged. -->
