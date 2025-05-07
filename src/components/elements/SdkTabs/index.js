import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { SDK_LANGUAGES, LANGUAGE_TAB_GROUP } from '@site/src/constants/sdkLanguages';

// Named components for language-specific slots
export const Go = ({ children }) => children;
Go.displayName = 'go';

export const Java = ({ children }) => children;
Java.displayName = 'java';

export const Python = ({ children }) => children;
Python.displayName = 'py';

export const TypeScript = ({ children }) => children;
TypeScript.displayName = 'ts';

export const PHP = ({ children }) => children;
PHP.displayName = 'php';

export const DotNet = ({ children }) => children;
DotNet.displayName = 'dotnet';

export const Ruby = ({ children }) => children;
Ruby.displayName = 'rb';

// Main wrapper
const SdkTabs = ({ children }) => {
  const contentMap = {};

  React.Children.forEach(children, (child) => {
    if (child?.type?.displayName) {
      const langKey = child.type.displayName.toLowerCase();
      contentMap[langKey] = child;
    }
  });

  return (
    <Tabs groupId={LANGUAGE_TAB_GROUP}>
      {SDK_LANGUAGES.map(({ key, icon: Icon, label }) => (
        <TabItem key={key} value={key} label={<Icon title={label} />}>
          {contentMap[key] || (
            <div style={{ backgroundColor: '#ffffcc', padding: '1rem', borderRadius: '6px' }}>
              <strong>{label}</strong> example coming soon.
            </div>
          )}
        </TabItem>
      ))}
    </Tabs>
  );
};

SdkTabs.Go = ({ children }) => children;
SdkTabs.Go.displayName = 'go';

SdkTabs.Java = ({ children }) => children;
SdkTabs.Java.displayName = 'java';

SdkTabs.Python = ({ children }) => children;
SdkTabs.Python.displayName = 'py';

SdkTabs.TypeScript = ({ children }) => children;
SdkTabs.TypeScript.displayName = 'ts';

SdkTabs.PHP = ({ children }) => children;
SdkTabs.PHP.displayName = 'php';

SdkTabs.DotNet = ({ children }) => children;
SdkTabs.DotNet.displayName = 'dotnet';

SdkTabs.Ruby = ({ children }) => children;
SdkTabs.Ruby.displayName = 'rb';

export default SdkTabs;
