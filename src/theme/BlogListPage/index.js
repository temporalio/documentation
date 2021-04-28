/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogSidebar from '@theme/BlogSidebar';
import {ThemeClassNames} from '@docusaurus/theme-common';

function BlogListPage(props) {
  const {metadata, items, sidebar} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <Head>
        {/* <meta property="og:description" content={metadata.description} /> */}
        <meta charSet="utf-8" />
        <title>Temporal BLog</title>
        {/* <link rel="canonical" href={`https://docs.temporal.io/` + metadata.permalink} /> */}
      </Head>
      <Layout
        title={title}
        description={blogDescription}
        wrapperClassName={ThemeClassNames.wrapper.blogPages}
        pageClassName={ThemeClassNames.page.blogListPage}
        searchMetadatas={{
          // assign unique search tag to exclude this page from search results!
          tag: 'blog_posts_list',
        }}>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--3">
              <BlogSidebar sidebar={sidebar} />
            </div>
            <main className="col col--7">
              {items.map(({content: BlogPostContent}) => (
                <BlogPostItem
                  key={BlogPostContent.metadata.permalink}
                  frontMatter={BlogPostContent.frontMatter}
                  metadata={BlogPostContent.metadata}
                  truncated={BlogPostContent.metadata.truncated}>
                  <BlogPostContent />
                </BlogPostItem>
              ))}
              <BlogListPaginator metadata={metadata} />
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default BlogListPage;
