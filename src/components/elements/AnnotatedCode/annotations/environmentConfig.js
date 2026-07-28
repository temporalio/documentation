/** Highlight metadata only — code samples live in the MDX page. */

export const prodProfile = [
  {
    label: 'Address',
    description:
      'Temporal Service host and port. For Temporal Cloud, use your Namespace endpoint (for example your-namespace.account.tmprl.cloud:7233).',
    lines: [2],
  },
  {
    label: 'Namespace',
    description:
      'Namespace this Client connects to. On Temporal Cloud, include the account suffix when your tooling expects it.',
    lines: [3],
  },
  {
    label: 'API key',
    description:
      'Authenticates the Client to Temporal Cloud. Prefer environment variables for secrets in real deployments; TOML is fine for local profiles.',
    lines: [4],
  },
  {
    label: 'TLS',
    description:
      'Optional mTLS settings. TLS is often auto-enabled when an API key or TLS block is present; set certificate paths for mutual TLS.',
    lines: [6, 7, 8],
  },
];
