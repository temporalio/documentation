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

  // If we're in the develop section (SDKs), create a focused SDK navigation
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
            ...developSection.items.filter(item => item.label?.includes('SDK'))
          ]
        }
      ];
      return <DocSidebar {...props} sidebar={sdkSidebar} />;
    }
  }

  // If we're in Temporal Cloud section, show only Cloud items
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

  // If we're in References section, show only References items
  if (currentPath.startsWith('/references')) {
    const referencesSidebar = [
      {
        type: 'category',
        label: 'References',
        collapsed: false,
        items: props.sidebar?.filter(item => 
          item.id === 'references' || 
          item.link?.id === 'references' ||
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
          // Add Introduction section items that relate to concepts
          ...props.sidebar?.filter(item => 
            item.label === 'Introduction' || 
            item.id === 'encyclopedia' ||
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