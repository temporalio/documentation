---
id: application-requirements
title: What are the requirements of the Background Check application?
sidebar_label: Application requirements
description: The Background Check application is a simplified and scaled-down implementation for the use case. The requirements are simplified and scaled to match the implementation.
---

The Background Check application is a simplified and scaled-down implementation for the use case.
The requirements are simplified and scaled to match the implementation.

We can break down the application requirements in various ways.

- User experience requirements
- Application functional requirements
- Step-by-step flow

## Who are the users of this application?

We need to consider three users for this application:

- **Company:** The Company user is typically the HR person who is communicating with the Candidate and has their information.
  The Company HR person is the one who initiates Background Checks.
- **Candidate:** The Candidate is the user who is the subject of the Background Check.
  They will have to consent to the Background Check.
- **Researcher:** The Researcher is the user who does a manual "search" for information regarding the Candidate.
  In our application, the Researcher verifies the Candidate's employment information.

### What are the Company experience requirements?

The HR person at the Company is the one who initiates the Background Check for a given Candidate.
To start a Background Check, they need the email address of the Candidate.

In real life, the HR person would probably already have more of the Candidate's information, such as name, physical address, and date of birth.
To simplify the experience for this application, the Candidate enters that information at the same time that they accept the Background Check.

The HR person must also be ready to select which checks need to be performed for the position the Candidate is being hired for.
For this application, we assume that the HR person can select from just two packages:

- Standard package
- Full package

The Standard package conducts two types of Searches, while the Full package conducts five types of Searches.

You can probably already envision the basic, secured user interface that the HR person would be interacting with: a form for the Candidate information, a list to select the package, and a button that says "Start Background Check".

After entering the information and clicking the button, the HR person has two options available:

1. Cancel the Background Check
2. View the status of the Background Check

After the Background Check fully completes, the option to cancel goes away.
All that remains is the option to see the final status.

For this application, we simulate this experience through the use of a shared mailbox.
A dedicated UI is available to the HR person as well as a [Company CLI](/learning-paths/background-checks/cli-reference#bgc-company).

The HR person also has a separate option that is always available to them to list the metadata of Background Checks that are in the system and filter them by Candidate, status, or Background Check Id.

### What are the Candidate experience requirements?

The Candidate must accept the Background Check while simultaneously providing or confirming their name, address, date of birth (DOB), and Social Security number (SSN).
Here you can envision the Candidate receiving email that contains a link to a secured web form that has an input field for their SSN, a checkbox to confirm consent, a checkbox to confirm that their other information is correct, and a button that says "Submit".

For this application, the experience can be simulated through either a UI or CLI.

### What are the Researcher experience requirements?

The Researcher investigates and verifies the employment history of a Candidate.
They receive the request to verify via email, and they must have a means to provide the results of their research.

For this application, the experience can be simulated through either a UI or CLI.

## What are the application's functional requirements?

Already we can start to see some of the functional requirements, such as application APIs, data encryption for personally identifiable information (PII), the ability to await on Candidate input for hours or days if needed, and the ability to conduct checks concurrently whenever possible.

**APIs**

Based on the experiences of the three user types, we know we need APIs for the following:

- Start a Background Check
- Accept Background Check
- Cancel a Background Check
- List Background Checks
- Submit research
- Get the report of a specific Background Check

For API details, see the [Application API reference](/learning-paths/background-checks/api-reference).

**UIs**

- The Company HR person needs a dedicated UI to start, cancel, or list Background Checks.
- The Candidate needs a UI to accept the Background Check.
- The Researcher needs a UI to provide the results of their research.

**CLIs**

As a backup, or an alternative to using a UI, we can have a CLI for each user type that uses the same APIs that the UIs do.

For CLI details, see the [Application CLI reference](/learning-paths/background-checks/cli-reference).

**How we handle PII**

Because we are dealing with PII, the application must have a way to encrypt and decrypt data.
The PII that the application processes includes a Candidate's SSN, contact information, DOB, and personal addresses.
Data must be consistently encrypted while it is in the Temporal Platform but be decryptable when needed.

**Wait on humans**

In two scenarios, the Background Check must wait on a human.

The first is when the Candidate must accept the Background Check.
During this step, the Candidate also needs a secure way to provide their SSN and other PII.
When this step is complete, the Searches can start automatically.

The second is when a Researcher must respond to a Research Request.
In our application, a Researcher is used to verify employment of the Candidate.
We must pretend that, after receiving email with the Research Request, the Researcher would make some phone calls and send some email of their own to verify employment.
They must then send their results back to the application.

In both cases, there is no guarantee of when the Candidate or Researcher might take action.
The email requesting action could sit in their inboxes, unnoticed for some time.
Therefore the application must be able to maintain the state of the Background Check over many days, and perhaps even weeks, waiting on data.

### Concurrent Background Check Searches

Many of the Background Check Searches should happen concurrently.

The following are the predefined Background Check packages available to the Company HR person to select when they start a Background Check for a Candidate.

- Standard package
  - SSN trace
  - Federal criminal search
- Full package
  - SSN trace
  - Motor vehicle report
  - Federal criminal search
  - Employment verification
  - State criminal search

The initial Search for either package is an SSN trace meant to find additional addresses associated with the Candidate.
Those addresses are used in the other Searches.
However, all checks beyond the SSN trace should be conducted in parallel to save as much time as possible.

## What is the step-by-step flow?

Now we can envision the the high-level step-by-step flow that we could expect from the application.

![Swim lane diagram of the high-level step-by-step flow for the Full package](/diagrams/background-checks/step-by-step-high-level-swim-lane.svg)

1. A new Background Check is started by the Company HR person.
   They entered the Candidate's email address, selected a Background Check package, and clicked "Start".
2. The application sends email to the Candidate with instructions on how to accept the Background Check and waits, making no further progress.
   For the sake of this Learning Path, if the Candidate does not respond within 5 minutes, the Background Check is canceled.
   If the Candidate rejects the Background Check, it is canceled.
3. The Candidate follows the instructions to accept.
4. The application initiates the first Search and waits on the results.
5. The application initiates all remaining Searches in parallel, and waits on the results.
6. All additional Searches complete.
7. The application generates the report.
8. The Company HR person is notified via email.

Variations of this flow include the HR Person listing and filtering metadata for all Background Checks, canceling a running Background Check, and checking for the report of a specific Background Check.
