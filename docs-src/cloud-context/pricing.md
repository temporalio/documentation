---
id: pricing
title: Temporal Cloud Pricing
sidebar_label: Pricing
description: "Temporal Cloud pricing information."
tags:
  - guide-context
---

Temporal Cloud is a consumption-based service; you pay only for what you need when you need it. Pricing is flexible, transparent, and predictable, so you know your costs and never pay for unused capacity.

This page introduces the elements of Temporal Cloud pricing so that you can estimate costs for your implementation. To gain a reliable estimate, [contact our team](https://pages.temporal.io/contact-us).

## Temporal Actions

Actions are the fundamental consumption pricing unit in Temporal Cloud. An Action in Temporal occurs as part of an execution of your Workflow. Each time you execute a Temporal Workflow (a Workflow Execution), the associated Actions are collected and ultimately represent the state and progress of your Temporal Application.

For a deeper description of Actions, see [Action](/cloud#action). You can also [reach out to our team](https://pages.temporal.io/contact-us) to get more information or to help size your number of Actions.

Actions are collected and billed monthly for each Namespace. The base rate is $25 per one million Actions, and you are billed only for the prorated amount of Actions you use. If you use fewer than one million Actions per month, your bill for Actions will be less than $25 for that month.

| **Actions per month** | **Cost per 1M (USD)** |
| --------------------- | --------------------- |
| Any number            | $25.00 (prorated)     |

Alternatively, Temporal also offers a credit system. Credits provide an additional discount schedule for both billable Actions and storage. Credits do not expire. The following table outlines cost estimates and discount bands for the credits system. Please reach out to the team if you are interested in this option.

| **Actions per month (millions)** | **Cost per 1M (USD)** | **Cost band**       | **Actions per second** |
| -------------------------------- | --------------------- | ------------------- | ---------------------- |
| 0 to 299                         | $23.25                | $0–$7,500           | ~115                   |
| 300 to 1,499                     | $18.80                | $5,640–$28,200      | ~570                   |
| 1,500 to 7,499                   | $14.10                | $21,150–$105,750    | ~2,860                 |
| 7,500 to 29,999                  | $10.50                | $78,750–$315,000    | ~11,400                |
| 30,000 to 149,999                | $7.90                 | $237,000–$1,185,000 | ~57,000                |
| 150,000 or more                  | $5.90                 | Begins at $885,000  | n/a                    |

## Storage

An execution of a particular Workflow could exist for a few seconds, a day, month, or even forever. Temporal collects the Event History during this time and dispatches work when necessary. In this context, a Workflow Execution has only two states, open (active) or closed.

Storage costs are measured in gigabyte-hours (GBh) and include charges for active Workflows, "running" storage, and the long-term, "retained" storage of Event Histories of closed Workflows. These are measured per Namespace.

Running storage is a measure of the amount of storage used to store active Workflows. When the execution of a Workflow ends, Temporal Cloud stores Event History for a defined Retention Period, for historical use. This is retained storage. Typical uses include compliance, debugging, workload refresh, and business analytics. Both kinds of storage have fixed costs.

| **Storage** | **Cost per GBh** |
| ----------- | ---------------- |
| Retained    | $0.00042         |
| Running     | $0.042           |

If you purchase Temporal Cloud credits (as outlined earlier), running storage costs are tiered and measured in gigabyte-hours.

| **Running storage** | **Cost per GBh** |
| ------------------- | ---------------- |
| Less than 10        | $0.042           |
| 10 to 39            | $0.031           |
| 40 to 119           | $0.023           |
| 120 to 499          | $0.018           |
| 500 to 1999         | $0.013           |
| 2000 or more        | $0.010           |

## Support

With a subscription to Temporal Cloud, you also gain access to our support organization of developer success engineers and solution architects. Our experts assist with a range of work streams from Workflow design reviews to setting up observability to break/fix support with an agreed-upon set of SLAs.

The members of the Temporal Developer Success team are engineers who are Temporal experts and open source contributors. They're backed by the main contributors to the open source Temporal project. They provide deep knowledge of how Temporal works and how you can optimize your deployment.

They also investigate your Workflows to optimize their environments and possibly reduce costs associated with Actions and storage. They ensure your instance is performance tuned and help with other ongoing maintenance, like upgrades of the Temporal software and maintenance of the platform.

If an issue occurs, the team provides support through our [portal](/cloud/how-to-create-a-ticket-for-temporal-support), [community forum](https://community.temporal.io/), knowledge base, and an optional dedicated Slack channel. Temporal offers two levels of support defined by their availability and SLAs.

|                | **Basic**                                                                                    | **Premium**                                                                            |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Response times | P0: 1 business hour<br/>P1: 4 business hours<br/>P2: 1 business day<br/>P3: 2 business days | P0: 30 minutes<br/>P1: 1 business hour<br/>P2: 4 business hours<br/>P3: 1 business day |
| Pricing        | Greater of $200 or 10% monthly usage (per month)                                             | Greater of $2,000 or 10% monthly activity (per month)                                  |

Business hours for Temporal Support are 0900–1700 Monday–Friday (Pacific Time).
For P0 issues, coverage is 24×7.

## SSO and SAML

We offer single sign-on (SSO) integration using SAML at a monthly fixed fee based on the number of users registered in Temporal Cloud:

| **Users** | **Cost per month** |
| --------- | ------------------ |
| 0 to 25   | $200               |
| 26 to 50  | $300               |
| 51+       | $500               |

## Pricing estimates

Temporal Cloud employs a consumption-based pricing model that's based on storage and execution, factors that vary from one Workflow to the next. You can estimate the cost of a specific Workflow by running it at a low volume and then using its storage and compute measurements to project your production-scale cost. Our team is happy to [help you estimate the cost](https://pages.temporal.io/contact-us) for your specific workloads.

## Temporal pricing FAQ

Q: What’s the minimum cost to run Temporal Cloud?

A: The Temporal Cloud service is consumption based. You pay only for what you need with no minimum. Basic support has a minimum monthly fee of $200 per month.

Q: How do I pay for Temporal Cloud?

A: Temporal sends a monthly bill based on your consumption. You can pay this bill with a credit card, ACH, wire transfer, or Temporal Credits.

Q: Can I purchase Temporal Cloud through my Amazon, Azure, or Google Cloud Platform marketplace?

A: You can purchase Temporal Cloud credits in the AWS Marketplace. Please contact our team at sales@temporal.io to learn more about our private offer on the AWS Marketplace.
