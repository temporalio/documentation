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
Each Id is a short string of numbers and letters, at least five characters long. This account identifier is retained throughout the time each customer uses Temporal Cloud.

At times you may need to know a customer Account Id.
Accessing the account's Namespaces provides an easy way to capture this information.
Each Temporal Namespace use an Account Id suffix.
This is the alphanumeric character string found after the period in any Temporal Cloud Namespace name.

To retrieve an Account Id, follow these steps.
You can use a Web browser or issue commands from a command line interface (CLI).

From the Web:

1. Log into Temporal Cloud from a Web Browser.
2. Navigate to the Namespace list page from the left-side vertical navigation. 
3. View the Namespaces listed for the user. 
   Each Namespace uses an Account Id suffix.

From the Command Line:

1. Use the `tcld` utility to log into an account.
   A Web page automatically opens for authentication.
       $ tcld login

1. Log into Temporal Cloud.
2. Navigate to the Namespace list page from the left-side vertical navigation.


To view Namespace information from the command line instead of the Web, use the `tcld` CLI utility.

