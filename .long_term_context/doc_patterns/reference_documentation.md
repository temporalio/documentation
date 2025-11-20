# Reference Documentation Patterns

## Error Reference Entries (errors.mdx)

Error entries in `/docs/references/errors.mdx` should be concise and follow a consistent pattern:

**Format:**
- 2-4 sentences maximum per error entry
- No subsections (no "Why" or "How" headers)
- Direct, actionable instructions
- Structure: what the error is → what causes it → how to fix it

**Example of good conciseness:**
```
This error occurs when the Workflow Task response exceeds the gRPC message size limit of 4 MB.
The Workflow Execution is automatically terminated because this is a non-recoverable error.

This typically happens when a Workflow schedules too many Activities, Child Workflows, or commands in a single Workflow Task, or when a Workflow returns a large result.

To resolve this error, fix your Workflow code and start a new Workflow Execution.
Break work into smaller batches, reduce the size of Workflow returns, use Continue-As-New for long-running Workflows, or compress large payloads with a custom Payload Codec.

See the [BlobSizeLimitError troubleshooting guide](/troubleshooting/blob-size-limit-error) for detailed resolution strategies.
```

**For detailed troubleshooting:**
- Link to dedicated troubleshooting guides rather than including extensive details in the error reference
- The error reference should be scannable; detailed guides can be comprehensive
