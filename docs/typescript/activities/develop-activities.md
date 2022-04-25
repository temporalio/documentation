Activities execute in the standard Node.js environment.
Activities cannot be in the same file as Workflows and must be separately registered.
Activities may be retried repeatedly, so you may need to use idempotency keys for critical side effects.
