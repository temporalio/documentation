import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import { useLocation } from '@docusaurus/router';

export default function DocSidebarWrapper(props) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to find sidebar items by label
  const findSidebarSection = (label) => {
    return props.sidebar?.find(item => item.label === label);
  };

  // Only show full sidebar for homepage
  if (currentPath === '/' || currentPath === '/index') {
    return <DocSidebar {...props} />;
  }

  // If we're in the develop section (including main page), create a focused SDK navigation
  if (currentPath.startsWith('/develop') || currentPath.startsWith('/cli')) {
    const developSection = findSidebarSection('Develop');
    if (developSection) {
      const sdkSidebar = [
        {
          type: 'category',
          label: 'Developer SDKs',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'develop/index',
              label: 'Overview'
            },
            // Include all SDK categories
            ...developSection.items.filter(item => item.label?.includes('SDK')),
            // Include additional development tools and guides
            ...developSection.items.filter(item => 
              item.id === 'develop/activity-retry-simulator' ||
              item.id === 'develop/worker-performance' ||
              item.id === 'develop/safe-deployments' ||
              (typeof item === 'string' && (
                item.includes('activity-retry-simulator') ||
                item.includes('worker-performance') ||
                item.includes('safe-deployments')
              ))
            )
          ]
        }
      ];
      return <DocSidebar {...props} sidebar={sdkSidebar} />;
    }
  }

  // If we're in Temporal Cloud section (including main page), show only Cloud items
  if (currentPath.startsWith('/cloud') || currentPath.startsWith('/ops') || 
      currentPath.startsWith('/production-deployment/cloud')) {
    const cloudSection = findSidebarSection('Deploy to production');
    if (cloudSection) {
      const cloudSidebar = [
        {
          type: 'category',
          label: 'Temporal Cloud',
          collapsed: false,
          items: cloudSection.items.filter(item => 
            item.label?.includes('Cloud') || 
            item.link?.id?.includes('cloud') ||
            item.id?.includes('cloud')
          )
        }
      ];
      return <DocSidebar {...props} sidebar={cloudSidebar} />;
    }
  }

  // If we're in References section (including main page), show only References items
  if (currentPath.startsWith('/references')) {
    // Find the actual References section in the sidebar
    const referencesSection = props.sidebar?.find(item => 
      item.id === 'references' || 
      item.link?.id === 'references' ||
      item.label === 'References'
    );
    
    if (referencesSection) {
      return <DocSidebar {...props} sidebar={[referencesSection]} />;
    }
    
    // Fallback if References section structure is different
    const referencesSidebar = [
      {
        type: 'category',
        label: 'References',
        collapsed: false,
        items: props.sidebar?.filter(item => 
          item.id?.includes('references') || 
          item.link?.id?.includes('references') ||
          (typeof item === 'string' && item.includes('references'))
        ) || []
      }
    ];
    return <DocSidebar {...props} sidebar={referencesSidebar} />;
  }

  // If we're in Concepts section (Encyclopedia, Troubleshooting, Security, Glossary)
  if (currentPath.startsWith('/encyclopedia') || currentPath.startsWith('/troubleshooting') || 
      currentPath === '/security' || currentPath === '/glossary' || 
      currentPath.startsWith('/evaluate')) {
    
    const conceptsSidebar = [
      {
        type: 'category',
        label: 'Concepts',
        collapsed: false,
        items: [
          // Include Understanding Temporal from Introduction section (at top)
          {
            type: 'link',
            label: 'Understanding Temporal',
            href: '/evaluate/understanding-temporal'
          },
          // Include Encyclopedia section
          ...props.sidebar?.filter(item => 
            item.id === 'encyclopedia' ||
            item.link?.id === 'encyclopedia' ||
            item.label === 'Encyclopedia'
          ) || [],
          // Include other concept-related items
          ...props.sidebar?.filter(item => 
            item.id === 'troubleshooting' ||
            item.id === 'security' ||
            item.id === 'glossary'
          ) || []
        ]
      }
    ];
    return <DocSidebar {...props} sidebar={conceptsSidebar} />;
  }

  // For all other pages, show the normal sidebar
  return <DocSidebar {...props} />;
} 