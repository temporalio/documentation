# User Metadata Documentation Plan

## Overview
This document outlines the plan for creating comprehensive documentation for the user metadata feature across all Temporal SDKs. The feature allows users to set arbitrary information on workflows and events, which can be leveraged by the UI to provide more context.

## User Metadata Feature Components
For each SDK, we need to document the following aspects:

1. **Static summary/details on workflows**
   - How to set metadata when starting a workflow
   - How to retrieve workflow metadata

2. **Current details on workflows**
   - How to get current workflow details within a workflow
   - How to set/update current workflow details within a workflow (only possible from inside the workflow)

3. **Summary on timers and activities**
   - How to attach metadata to timers
   - How to attach metadata to activities

4. **Descriptions on signals, queries, and updates**
   - How to add metadata to signals
   - How to add metadata to queries
   - How to add metadata to updates

## Documentation Structure
For each SDK, we will create or update documentation in its respective directory under `/docs/develop/[sdk-name]/`. The documentation will follow the existing patterns and structure of each SDK's documentation, but generally include:

1. **Introduction to User Metadata**
   - Brief explanation of what user metadata is
   - Common use cases

2. **API Examples**
   - Concise code examples for each use case
   - Clear explanations of parameters with accurate field names:
     - verify field names for each SDK

3. **Best Practices (if appropriate)**
   - Simple recommendations for effective use

Note: We'll keep the documentation concise and focused, as this is a relatively simple feature.

## Important Rules
1. **Verify API Semantics**: Double-check the exact field names and semantics of APIs before documenting them.
2. **Ask for Clarification**: If there are any uncertainties or need for additional context/information, ask first before continuing.
3. **Do Not Make Assumptions**: When in doubt about how an API works, request specific information rather than making assumptions.

## Implementation Plan

### Phase 1: Python SDK
1. Analyze existing Python SDK documentation structure and patterns
2. Request API reference information for Python SDK user metadata implementation
3. Create documentation in `/docs/develop/python/user-metadata.mdx`
4. Review and refine

### Phase 2: TypeScript SDK
1. Analyze existing TypeScript SDK documentation structure and patterns
2. Request API reference information for TypeScript SDK user metadata implementation
3. Create documentation in `/docs/develop/typescript/user-metadata.mdx`
4. Review and refine

### Phase 3: Go SDK
1. Analyze existing Go SDK documentation structure and patterns
2. Request API reference information for Go SDK user metadata implementation
3. Create documentation in `/docs/develop/go/user-metadata.mdx`
4. Review and refine

### Phase 4: Java SDK
1. Analyze existing Java SDK documentation structure and patterns
2. Request API reference information for Java SDK user metadata implementation
3. Create documentation in `/docs/develop/java/user-metadata.mdx`
4. Review and refine

### Phase 5: .NET SDK
1. Analyze existing .NET SDK documentation structure and patterns
2. Request API reference information for .NET SDK user metadata implementation
3. Create documentation in `/docs/develop/dotnet/user-metadata.mdx`
4. Review and refine

### Phase 6: PHP SDK
1. Analyze existing PHP SDK documentation structure and patterns
2. Request API reference information for PHP SDK user metadata implementation
3. Create documentation in `/docs/develop/php/user-metadata.mdx`
4. Review and refine

### Phase 7: Ruby SDK
1. Analyze existing Ruby SDK documentation structure and patterns
2. Request API reference information for Ruby SDK user metadata implementation
3. Create documentation in `/docs/develop/ruby/user-metadata.mdx`
4. Review and refine

## Timeline
- Each SDK documentation is estimated to take 1-2 days to complete
- Total project timeline: 2-3 weeks

## Next Steps
1. Begin with Python SDK documentation
2. Analyze existing Python SDK documentation patterns
3. Request API reference information for Python SDK user metadata implementation
4. Create initial draft of Python documentation
5. Review with stakeholders
6. Proceed to next SDK 