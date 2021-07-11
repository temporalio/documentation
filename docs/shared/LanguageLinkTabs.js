import React from "react";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedRead from './RelatedRead'

export default function LangugageLinkTabs({
  goText,
  goGoTo,
  javaText,
  javaGoTo,
  nodeText,
  nodeGoTo,
  phpText,
  phpGoTo,
}) {
  return (
    <Tabs
      groupId='sdk-preference'
      defaultValue='go'
      values={[
        {label: 'Go', value: 'go'},
        {label: 'Java', value: 'java'},
        {label: 'Node.js', value: 'node'},
        {label: 'PHP', value: 'php'},
      ]
      }>
      <TabItem value='go'>

        <RelatedRead
          text={goText}
          goTo={goGoTo}
          tagChar="g"
        >
        </RelatedRead>

      </TabItem>
      <TabItem value='java'>

        <RelatedRead
          text={javaText}
          goTo={javaGoTo}
          tagChar="g"
        >
        </RelatedRead>

      </TabItem>
      <TabItem value='node'>

        <RelatedRead
          text={nodeText}
          goTo={nodeGoTo}
          tagChar="g"
        >
        </RelatedRead>

      </TabItem>
      <TabItem value='php'>

        <RelatedRead
          text={phpText}
          goTo={phpGoTo}
          tagChar="g"
        >
        </RelatedRead>

      </TabItem>
    </Tabs>
  );
}
