---
id: cli-reference
title: Background Checks CLI reference
sidebar_label: CLI reference
---

For this Learning Path, we use three distinct CLIs to represent the user interfaces (UI) that each user type would interact with.

- [Company CLI](#bgc-company)
- [Candidate CLI](#bgc-candidate)
- [Researcher CLI](#bgc-researcher)

To execute these CLI commands, prefix them with `./run-cli` while in the project root.

Example:

```
./run-cli bgc-company list
```

## `bgc-company`

CLI tool that represents the UI for the Company.

### `list`

Lists Background Checks that are in the system.

**Example**:

```bash
bgc-company list
```

**Output**:

By default, without any options, lists all Background Checks from most recent to oldest.

Default list count is 100.

#### `--email` (optional)

Lists all Background Checks associated with the email address.

Example:

```bash
bgc-company list --email <candidate_email>
```

#### `--status` (optional)

Lists Background Checks that match the provided status.

**Example**:

```bash
bgc-company list --status <status>
```

Possible `--status` values:

- started
- pending_consent
- running
- completed
- cancelled

### `start`

Starts a new Background Check.

Example:

```bash
bgc-company start --email <candidate_email> --package <package_type>
```

Output:

If successful, the output shows "Created check".

#### `--email` (required)

Email address of the Candidate

#### `--package` (required)

Package of searches.

Possible values are:

- standard
- full

### `cancel`

Cancels a Background Check.

Example:

```bash
bgc-company cancel --email <email> --id <check_id>
```

Output:

If successful the output shows "Cancelled check".

#### `--id` (required)

Background Check Id

#### `--email` (required)

Email address of the Candidate

## `bgc-candidate`

CLI tool that represents the UI for the Candidate

### `accept`

Candidate accepts the Background Check

**Example:**

```bash
bgc-candidate accept --token <token> --ssn <ssn> --address <address> --dob <dob>
```

**Output:**

If successful, the output shows "Accepted".

#### `--token` (required)

Background Check Token.

Get this from the email.

#### `--ssn` (required)

Social Security number of the Candidate.

#### `--address` (required)

Physical address of the Candidate

#### `--dob` (required)

Date of birth of the Candidate

### `decline`

Candidate declined the Background Check

**Example:**

```bash
bgc-candidate decline --token <token>
```

**Output:**

If successful, the output shows "Declined".

## `bgc-researcher`

CLI tool that represents the UI for the Researcher

### `employmentverify`

Complete a Research Request by providing input.

**Example:**

```bash
bgc-researcher employmentverify --token <token>
```

**Output:**

If successful, the output shows "Employment verification received".

#### `--token` (required)

Background Check Token.

Get this from the email.
