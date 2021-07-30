/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogSidebar from "@theme/BlogSidebar";
import TOC from "@theme/TOC";
import Translate from '@docusaurus/Translate';
import IconEdit from '@theme/IconEdit';
import { ThemeClassNames } from "@docusaurus/theme-common";

function BlogPostPage(props) {
  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, metadata } = BlogPostContents;
  const { title, description, nextItem, prevItem, editUrl } = metadata;
  const { hide_table_of_contents: hideTableOfContents } = frontMatter;
  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
    >
      {BlogPostContents && (
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--1"></div>
            <main className="col col--9">
              <BlogPostItem
                frontMatter={frontMatter}
                metadata={metadata}
                isBlogPostPage
              >
                <BlogPostContents />
              </BlogPostItem>
              <div style={{ marginTop: '2rem' }}>{editUrl && (
                <a href={editUrl} target="_blank" rel="noreferrer noopener">
                  <IconEdit />
                  <Translate
                    id="theme.common.editThisPage"
                    description="The link label to edit the current page">
                    Have a suggestion? Spotted an inaccuracy? Help us fix it!
                  </Translate>
                </a>)}</div>
              {(nextItem || prevItem) && (
                <div className="margin-vert--xl">
                  <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
                </div>
              )}
            </main>
            {!hideTableOfContents &&
              BlogPostContents.toc &&
              BlogPostContents.toc.length > 1 && (
                <div className="col col--2">
                  <TOC toc={BlogPostContents.toc} />
                </div>
              )}
          </div>
          <div className="row">
            <div className="col">
              <BlogSidebar sidebar={sidebar} row={true} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BlogPostPage;
