---
id: what-is-a-cloud-account-id
title: What is a Temporal Cloud Account Id?
sidebar_label: Temporal Cloud Account Id
description: A Temporal Cloud Account Id is a unique identifier for a customer.
tags:
  - term
  - explanation
---

A Temporal Cloud Account Id is a unique customer identifier assigned by Temporal Technologies.
Each Id is a short string of numbers and letters like `f45a2`, at least five characters long.
This account identifier is retained throughout the time each customer uses Temporal Cloud.

At times you may need to know a customer Account Id.
Accessing the account's Namespaces provides an easy way to capture this information.
Each Temporal Namespace use an Account Id suffix.
This is the alphanumeric character string found after the period in any Temporal Cloud Namespace name.

You can retrieve an Account Id from the [Temporal Cloud](https://cloud.temporal.io) Web UI or by using the `tcld` utility at a command line interface (CLI).
Follow these steps.

**From the Temporal Cloud Web UI:**

1. Log into Temporal Cloud.
2. Navigate to the Namespace list page from the left-side vertical navigation.
3. View the Namespaces listed for the user. Each Namespace includes several details:
   - _Status_:
     the Namespace's current state within the Temporal Cloud system, such as Active, Updating, or Deprecated.
   - _Name_:
     a customer-supplied identifier.
     It is unique within the scope of a customer's account.
   - _Region_:
     corresponds to the Namespace's [hosting region](/cloud/service-availability#regions).
   - _Retention_:
     a period during which completed workflows can be recovered and analyzed.
   - _APS Limit_:
     the maximum number of actions per second that a namespace supports.

Each Namespace automatically appends an Account Id suffix to its customer-supplied identifier.
This five-or-longer string appears after the name, separated by a period.

| Status | Name                     | Region    | Retention | APS Limit | Export |
| ------ | ------------------------ | --------- | --------- | --------- | ------ |
| Active | your-namespace.123def    | us-west-2 | 30 Days   | 400       | --     |
| Active | another-namespace.123def | us-west-2 | 30 Days   | 400       | --     |

In this Namespace listing sample, the Account Id is 123def.

**From the Command Line:**

1. Use the `tcld` utility to log into an account.

   ```
   tcld login
   ```

   The `tcld` output presents a URL with an activation code at the end. Take note of this code. The utility blocks until the login/activation process completes.

   ```
   Login via this url: https://login.tmprl.cloud/activate?user_code=KTGC-ZPWQ
   ```

   A Web page automatically opens for authentication in your default browser.

2. Visit the browser. Ensure the user code shown by the CLI utility matches the code shown in the Web browser.
   Then, click Confirm in the browser to continue.

   After confirmation, Web feedback lets you know that the CLI "device" is now connected.

3. Return to the command line.
   Issue the following command.

   ```
   tcld namespace list
   ```

   The CLI tool returns a short JSON packet with your namespace information.
   This is the same list found in the Temporal Cloud Web UI Namespaces list.
   Like the browser version, each Namespace uses an Account Id suffix.

   ```
   {
     "namespaces": [
       "your-namespace.123def",
       "another-namespace.123def"
     ],
     "nextPageToken": ""
   }
   ```

In this example, the Account Id is `123def`.
