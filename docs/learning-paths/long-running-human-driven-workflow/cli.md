---
id: cli
title: Long Running Human Drive Process CLI reference
sidebar_label: CLI reference
---

For this Learning Path we use three distinct CLIs to represent the user interfaces (UI) that each user type would have to interact with.

- [Company CLI](#bgc-company)
- [Candidate CLI](#bgc-candidate)
- [Researcher CLI](#bgc-researcher)

The execute these CLI commands, prefix them with `./run-cli` while in the project root.

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

#### `--candidate` (optional)

Lists all Background Checks associated with the email address.

Example:

```bash
bgc-company list --candidate <candidate_email>
```

#### `--id` (optional)

Lists a specific Background Check that matches the Id.

**Example**:

```bash
bgc-company list --id <check_id>
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
- completed
- cancelled
- running

### `start`

Starts a new Background Check.

Example:

```bash
bgc-company start --email <candidate_email> --package <package_type>
```

Output:

If successful, shows a check Id.

#### `--email` (required)

Email address of the Candidate

#### `--package` (required)

Package of searches.

Possible values are:

- standard
- full

## `cancel`

Cancels a Background Check.

Example:

```bash
bgc-company cancel --id <check_id>
```

Output:

#### `--id` (required)

Background Check Id

### `status`

View the results of a specific Background Check.

#### `--id` (required)

Background Check Id

**Example:**

```powershell
$ bgc-company status --id <check_id>
```

**Output:**

A report of the Background Check.

The report will include Candidate information and the results from each of the individual searches.

## `bgc-candidate`

CLI tool that represents the UI for the Candidate

### `accept`

Candidate accepts the Background Check

**Example:**

```bash
bgc-candidate accept --id <check_id> --ssn <ssn> --address <address> --dob <dob>
```

**Output:**

If successful the output will show "Background Check <check_id> has been successfully accepted."

If the check_id value does not exist, the output will show "Background Check check_id does not exist."

If the Background Check has already started or completed, the output will show "Background Check check_id has already been accepted."

If fields are missing, output will show "Required fields are missing."

#### `--id` (required)

Background Check Id.

Get this from the email.

#### `--ssn` (required)

Social Security Number of the Candidate.

#### `--address` (required)

Physical address of the Candidate

#### `--dob` (required)

Date of birth of the Candidate

## `bgc-researcher`

CLI tool that represents the UI for the Researcher

### `submit`

Complete a Research Request by providing input.

**Example:**

```bash
bgc-researcher resolve -id <id> -message <message>
```

**Output:**

If successful the output will show "Research Request <request_id> complete."

If fields are missing out will show "Required fields are missing."

#### `--id` (required)

Research Request Id

#### `--message` (required)

Message that represents the research done by the Researcher.
