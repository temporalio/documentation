import React from 'react';
import Layout from '@theme/Layout';

export default function NexusDemo() {
  return (
    <Layout
      title="Temporal Nexus — Interactive Demo"
      description="An interactive walkthrough of Temporal Nexus: what it is, how it works, and how to build with it."
      noFooter
    >
      <iframe
        src="/nexus-demo.html"
        style={{
          display: 'block',
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
        }}
        title="Temporal Nexus Interactive Demo"
      />
    </Layout>
  );
}
