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
Each Id is a short string of numbers and letters, at least five characters long.
This account identifier is retained throughout the time each customer uses Temporal Cloud.

At times you may need to know a customer Account Id.
Accessing the account's Namespaces provides an easy way to capture this information.
Each Temporal Namespace use an Account Id suffix.
This is the alphanumeric character string found after the period in any Temporal Cloud Namespace name.

To retrieve an Account Id, follow these steps.
Either use a Web browser and visit [Temporal Cloud](https://cloud.temporal.io) or issue commands using a command line interface (CLI).

From the Web:

1. Log into Temporal Cloud.
2. Navigate to the Namespace list page from the left-side vertical navigation. 
3. View the Namespaces listed for the user. 
   Each Namespace uses an Account Id suffix.

From the Command Line:

1. Use the `tcld` utility to log into an account.
   A Web page automatically opens for authentication.
       $ tcld login

2. Ensure the user code shown by the CLI utility matches the code shown in the Web browser.
   Then, click Confirm in the browser to continue.

       $ tcld login
       Login via this url: https://login.tmprl.cloud/activate?user_code=KTGC-ZPWQ

   After confirmation, the Web lets you know that the CLI "device" is now connected.

4. Return to the command line.
   Issue the following command.

       $ tcld namespace list

   The CLI tool returns a short JSON packet with your namespace information. 
   This is the same list found in the Web Namespaces list.
   Like the browser version, each Namespace uses an Account Id suffix.

       $ tcld namespace list
       {
   	    "namespaces": [
       		"your-namespace.123def",
       		"another-namespace.123def"
   	    ],
       	"nextPageToken": ""
       }



