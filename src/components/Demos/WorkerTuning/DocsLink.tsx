import type { ReactNode } from 'react'
import Link from '@docusaurus/Link'

// Docs-site addition: links from the simulator to the Temporal documentation.
export function DocsLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="docs-link" to={to}>{children}</Link>
}

export function DocsLinks({ label = 'Learn more', children }: { label?: string; children: ReactNode }) {
  return <p className="docs-links">{label}: {children}</p>
}
