---
id: what-are-the-application-requirements
title: What are the requirements of the Long Running Human Driven Process application?
sidebar_label: Application requirements
description: TODO
---

import CenteredImage from "../../components/CenteredImage.js"

The application in this Learning Path is a simplified and scaled down implementation for the use case.
As such the requirements are simplified and scaled down to match it.

We can break down the application requirements in a few different ways.

- User experience requirements
- Application functional requirements
- Step by step flow

## Who are the users of this application?

There are 3 users we need to consider for this application:

- **Company:** The Company user is typically the HR Person who is communicating with the Candidate and has their information. The Company HR Person is the one who initiates Background Checks.
- **Candidate:** The Candidate is the user who is the subject of the Background Check. They will have to consent to the Background Check.
- **Researcher:** The Researcher is the user who does some sort of manual "search" for information reg

### What are the Company experience requirements?

The HR person at the Company is the one who initiates the Background Check for a given Candidate. To start a Background Check they need the email address of the Candidate.

In real life, the HR Person would probably already have more of the Candidate's information such as, name, physical address, and date of birth. For this Learning Path the Candidate will enter that information at the same time that they accept/consent to the Background Check to simplify the experience.

The HR person must also be ready to select which checks need to be performed for the position the Candidate is being hired for. For this Learning Path we will assume that the HR person can select from just two packages:

- Standard package
- Full package

The Standard package conducts two types of Searches, while the Full package conducts five types of Searches.

You can probably already envision the basic, secured user interface that the HR person would be interacting with that contains a form for the Candidate information, a drop down to select the package, and a button that says "Start Background Check".

After entering the information and clicking the button the HR person has two options available to them:

1. Cancel the Background Check
2. View the status of the Background Check

After the Background Check fully completes, the option to cancel will go away and all that will remain is the option to see the final status.

For this Learning Path, we will be simulating this experience through the use of a shared mailbox and the [Company CLI](/docs/learning-paths/long-running-human-driven-workflow/cli#bgc-company).

The HR person will also have a separate option that is always available to them to list the metadata of Background Checks that are in the system, and filter them by Candidate, status, or Background Check Id.

### What are the Candidate experience requirements?

The Candidate must consent to the Background Check while simultaneously providing/confirming their name, address, DOB, & Social Security Number.
Here you can envision the Candidate receiving an email with a link to a secured web form that has an input field for their SSN, a checkbox to confirm consent, a checkbox to confirm that their other information is correct, and a button that says "Submit" .

For this Learning Path we will be simulating this experience through the use of the Candidate CLI.

### What are the Researcher experience requirements?

The Researcher is the other human in this long running process.

## What are the application's functional requirements?

Already we can start to see some of the functional requirements take shape, such as application APIs, data encryption for PII, the ability to await on Candidate input for hours or days if needed, and the ability to conduct checks concurrently whenever possible.

### APIs

Based on the experiences of the two user types, we know we will need APIs for the following:

- Start a Background Check
- Accept Background Check
- Cancel a Background Check
- List Background Checks
- Get the report of a specific Background Check

See the Application API Reference for API details:

[Application API reference](/docs/learning-paths/long-running-human-driven-workflow/api)

### CLIs

We will need a CLI for each user type to represent the experience they would have from a user interface.

[Application CLI reference](/docs/learning-paths/long-running-human-driven-workflow/cli)

### Handling PII

Because we are dealing with PII (Personal Identifiable Information) the application must have a way to encrypt data while it is in transit, and at rest in the system.

### Awaiting

The Candidate needs a secure way to provide their SSN and confirm their consent.

The Company would like this to happen all at the same time and it needs to be the first step in the Background Check process. That way, the checks can start immediately and automatically as soon as the Candidate confirms.

However, there is no guarantee of when the Candidate might take this step after the HR person has initiated the Background Check.

Additionally there is no guarantee on how long each check might take.

Therefor the application must be able to maintain the state of the Background Check over many days, and perhaps even weeks, awaiting on data.

### Concurrent Background Check Searches

Many of the Background Check search should happen concurrently.

The Company HR Person will be able to select from two different packages of searches. The following are the predefined Background Check packages available to the Company HR Person to select when they kick off a Background Check for a Candidate.

- Standard package
  - SSN trace
  - Federal criminal search
- Full package
  - SSN trace
  - Motor vehicle report
  - Federal criminal search
  - Employment verification
  - State criminal search

The initial search for either package is an SSN trace meant to find additional addresses associated with the Candidate. Those addresses are used in the other Individual checks. However, all checks beyond the SSN trace should be conducted in parallel to save as much time as possible.

## What is the step-by-step flow?

Now we can envision the the high level step by step flow that we could expect from the application.

<CenteredImage
imagePath="/diagrams/learning-path-step-by-step-high-level-swim-lane.svg"
imageSize="100"
title="High level step-by-step 'Full package' flow"
/>

1. A new Background Check is started by the Company HR person.
   They have entered the Candidates email address and selected a Background Check package, and clicked "Start".
2. The application sends an email to the Candidate with instructions on how to accept the Background Check and waits, making no further progress.
   For the sake of this Learning Path, if the Candidate does not respond within 5 minutes, the Background Check is canceled.
   If the Candidate rejects the Background Check it is canceled.
3. The Candidate follows the instructions to accept.
4. The application initiates the first Search and waits on the results.
5. The application initiates all remaining Searches in parallel, and waits on the results.
6. All additional Searches complete.
7. The application generates the report.
8. The Company HR Person is notified via email.

There are variations of this flow that include the HR Person listing and filtering metadata for all Background Checks, canceling a running Background Check, and checking for the report of a specific Background Check.
