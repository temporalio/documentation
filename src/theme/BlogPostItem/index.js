/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import {MDXProvider} from "@mdx-js/react";
import Translate, {translate} from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import MDXComponents from "@theme/MDXComponents";
import Seo from "@theme/Seo";
import styles from "./styles.module.css";
import {usePluralForm} from "@docusaurus/theme-common"; // Very simple pluralization: probably good enough for now

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: "theme.blog.post.readingTime.plurals",
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One min read|{readingTime} min read",
        },
        {
          readingTime,
        }
      )
    );
  };
}

function BlogPostItem(props) {
  const readingTimePlural = useReadingTimePlural();
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {date, formattedDate, permalink, tags, readingTime} = metadata;
  const {author, title, image} = frontMatter;
  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  // const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL =
    frontMatter.author_image_url || frontMatter.authorImageURL;
  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? "h1" : "h2";
    return (
      <header>
        <TitleHeading
          className={clsx("margin-bottom--sm", styles.blogPostTitle)}
        >
          {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
        </TitleHeading>
        <div className={styles.avatar}>
          {authorImageURL && (
            <Link className="avatar__photo-link avatar__photo" href={authorURL}>
              <img src={authorImageURL} alt={author} />
            </Link>
          )}
          <div className="avatar__intro">
            {author && (
              <>
                <h4 className={styles.avatar__name}>
                  {authorURL ? (
                    <Link href={authorURL}>{author}</Link>
                  ) : (
                    <span>{author}</span>
                  )}
                </h4>
                {/* <small className="avatar__subtitle">{authorTitle}</small> */}
                <time dateTime={date} className={styles.blogPostDate}>
                  {formattedDate}
                  {readingTime && (
                    <>
                      {" · "}
                      {readingTimePlural(readingTime)}
                    </>
                  )}
                </time>
              </>
            )}
          </div>
        </div>
        <div className={styles.metadata}>
          {(tags.length > 0 || truncated) && tags.length > 0 && (
            <span className={styles.tagList}>
              {tags.map(({label, permalink: tagPermalink}) => (
                <Link
                  key={tagPermalink}
                  className="margin-horiz--sm"
                  to={tagPermalink}
                >
                  #{label}
                </Link>
              ))}
            </span>
          )}
        </div>
      </header>
    );
  };

  return (
    <>
      <Seo
        {...{
          title,
          description: metadata.description,
          keywords: tags.map((x) => x.label).join(", "),
          image,
        }}
      />

      <article className={!isBlogPostPage ? styles.postBottom : undefined}>
        {renderPostHeader()}
        <div className="markdown">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </div>
      </article>
    </>
  );
}

export default BlogPostItem;
