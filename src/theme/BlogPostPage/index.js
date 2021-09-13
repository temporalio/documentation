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
import Translate from "@docusaurus/Translate";
import IconEdit from "@theme/IconEdit";
import {ThemeClassNames} from "@docusaurus/theme-common";

function BlogPostPage(props) {
  const {content: BlogPostContents, sidebar} = props;
  const {frontMatter, metadata} = BlogPostContents;
  const {title, description, nextItem, prevItem, editUrl} = metadata;
  const {hide_table_of_contents: hideTableOfContents} = frontMatter;
  return (
    <div id="tailwind">
      <Layout
        title={title}
        description={description}
        wrapperClassName={ThemeClassNames.wrapper.blogPages}
        pageClassName={ThemeClassNames.page.blogPostPage}
      >
        {BlogPostContents && (
          <div className="container my-14">
            <div className="row">
              <div className="col col--1 -mr-8"></div>
              <main
                className={`col ${hideTableOfContents ? "col--9" : " mx-auto"}`}
              >
                <BlogPostItem
                  frontMatter={frontMatter}
                  metadata={metadata}
                  isBlogPostPage
                >
                  <BlogPostContents />
                </BlogPostItem>
                <div className="mt-8">
                  {editUrl && (
                    <a
                      className="block text-center"
                      href={editUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <IconEdit />
                      <Translate
                        id="theme.common.editThisPage"
                        description="The link label to edit the current page"
                      >
                        Have a suggestion? Spotted an inaccuracy? Help us fix
                        it!
                      </Translate>
                    </a>
                  )}
                </div>
                {(nextItem || prevItem) && (
                  <div className="margin-vert--xl">
                    <BlogPostPaginator
                      nextItem={nextItem}
                      prevItem={prevItem}
                    />
                  </div>
                )}
              </main>
              {!hideTableOfContents &&
                BlogPostContents.toc &&
                BlogPostContents.toc.length > 1 && (
                  <div className="col col--2 text-sm leading-normal pt-12">
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
    </div>
  );
}

export default BlogPostPage;
