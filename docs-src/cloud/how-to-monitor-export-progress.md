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

**How to monitor the History exportation progress**

Once you've finalized the setup, here's how to monitor the export progress:

1. **Export Job Execution**:
   - **Schedule**: The Export job is scheduled to run on an hourly basis, starting at 10 minutes past each hour.
     This ensures that the history data of Closed Workflows is exported to your designated S3 bucket approximately 60 minutes post Workflow closure. This delay can be configured.
   - **Duration**: The time taken for the export process can vary based on the amount of data, so it may not be instantaneous.
     Be patient and check the S3 bucket after the scheduled time.
2. **Checking the S3 Bucket**:
   - **Files Arrival**: Post the initial hour of setting up, inspect your S3 bucket.
     You should see the exported Workflow History files.
     These files encapsulate the relevant data from the Closed Workflows.
   - **Directory Structure**: Your exported files will adhere to the following naming convention and path:

   ```command
   s3://[bucket-name]/temporal-workflow-history/export/[Namespace]/[Year]/[Month]/[Day]/[Hour]/[Minute]/
   ```

3. **UI Insights**:
   - **Last Successful Export**: This displays the timestamp of the most recent successful export.
     It's an essential indicator of the last time your export process completed without any hitches.
   - **Last Status Check**: This reflects the timestamp of the latest internal Workflow check.
     This internal check routinely evaluates the health and status of the Export mechanism, ensuring its uninterrupted functioning.

For optimal results, make it a habit to frequently review the S3 bucket for any new exported files and consistently refer to the UI insights.
This dual check ensures you remain abreast of the export progress and any potential issues.
