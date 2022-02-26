/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { usePluralForm } from '@docusaurus/theme-common';
import { blogPostContainerID } from '@docusaurus/utils-common';
import MDXComponents from '@theme/MDXComponents';
import EditThisPage from '@theme/EditThisPage';
import styles from './styles.module.css';
import TagsListInline from '@theme/TagsListInline';
import BlogPostAuthors from '@theme/BlogPostAuthors'; // Very simple pluralization: probably good enough for now

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {
          readingTime,
        },
      ),
    );
  };
}

export default function BlogPostItem(props) {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    editUrl,
    // authors,
  } = metadata;
  const {
    author
  } = frontMatter;
  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  // const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL =
    frontMatter.author_image_url || frontMatter.authorImageURL;

  const image = assets.image ?? (frontMatter.image || "/img/temporal-logo-twitter-card.png");
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <article
      className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting">
      <header
        className={`my-12 flex flex-col ${
          isBlogPostPage ? "items-center justify-center" : ""
        }`}
      >
        <TitleHeading
          className={`mb-4 text-3xl font-semibold leading-relaxed  ${isBlogPostPage ? "max-w-lg text-center" : ""
            }`}
        >
          {isBlogPostPage ? (
            title
          ) : (
            <Link className="text-[color:var(--color)]" to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        <div className="mb-4 flex items-center space-x-2 py-2">
          {authorImageURL && (
            <Link href={authorURL}>
              <img
                className="h-10 w-10 rounded-full shadow-md"
                src={authorImageURL}
                alt={author}
              />
            </Link>
          )}
          {author && (
            <p className="py-1 font-medium">
              {authorURL ? (
                <Link href={authorURL}>{author}</Link>
              ) : (
                <span>{author}</span>
              )}
            </p>
          )}
        </div>
        <time dateTime={date} className="mb-4 block text-sm">
          {formattedDate}
          {readingTime && (
            <>
              {" · "}
              {readingTimePlural(readingTime)}
            </>
          )}
        </time>

        {(tags.length > 0 || truncated) && tags.length > 0 && (
          <span className="mb-5 flex flex-wrap">
            {tags.map(({label, permalink: tagPermalink}) => (
              <Link
                key={tagPermalink}
                className="my-2 mr-2 inline-flex items-center rounded-full bg-[color:var(--ifm-badge-background-color)] px-3 py-0.5 text-sm font-medium text-[color:var(--ifm-color)] no-underline hover:opacity-80"
                to={tagPermalink}
              >
                {label}
              </Link>
            ))}
          </span>
        )}
      </header>

      {image && (
        <meta
          itemProp="image"
          content={withBaseUrl(image, {
            absolute: true,
          })}
        />
      )}

      <div // This ID is used for the feed generation to locate the main content
        id={isBlogPostPage ? blogPostContainerID : undefined}
        className="markdown md:prose-md prose mx-auto sm:prose lg:prose-lg"
        itemProp="articleBody">
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx('row docusaurus-mt-lg', {
            [styles.blogPostDetailsFull]: isBlogPostPage,
          })}>
          {tagsExists && (
            <div
              className={clsx('col', {
                'col--9': truncatedPost,
              })}>
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <div
              className={clsx('col text--right', {
                'col--3': tagsExists,
              })}>
              <Link
                to={metadata.permalink}
                aria-label={translate(
                  {
                    message: 'Read more about {title}',
                    id: 'theme.blog.post.readMoreLabel',
                    description:
                      'The ARIA label for the link to full blog posts from excerpts',
                  },
                  {
                    title,
                  },
                )}>
                <b>
                  <Translate
                    id="theme.blog.post.readMore"
                    description="The label used in blog post item excerpts to link to full blog posts">
                    Read More
                  </Translate>
                </b>
              </Link>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}
