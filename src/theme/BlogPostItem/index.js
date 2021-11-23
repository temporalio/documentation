import React from "react";
import {MDXProvider} from "@mdx-js/react";
import {translate} from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import MDXComponents from "@theme/MDXComponents";
import Seo from "@theme/Seo";
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
  const {
    author,
    title,
    image = "/img/temporal-logo-twitter-card.png",
  } = frontMatter;

  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  // const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL =
    frontMatter.author_image_url || frontMatter.authorImageURL;

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? "h1" : "h2";
    return (
      <header
        className={`flex flex-col my-12 ${
          isBlogPostPage ? "items-center justify-center" : ""
        }`}
      >
        <TitleHeading
          className={`mb-4 leading-relaxed text-3xl font-semibold  ${
            isBlogPostPage ? "text-center max-w-lg" : ""
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
        <div className="flex mb-4 items-center py-2 space-x-2">
          {authorImageURL && (
            <Link href={authorURL}>
              <img
                className="rounded-full w-10 h-10 shadow-md"
                src={authorImageURL}
                alt={author}
              />
            </Link>
          )}
          {author && (
            <p className="font-medium py-1">
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
          <span className="flex flex-wrap mb-5">
            {tags.map(({label, permalink: tagPermalink}) => (
              <Link
                key={tagPermalink}
                className="mr-2 my-2 no-underline inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[color:var(--ifm-badge-background-color)] text-[color:var(--ifm-color)] hover:opacity-80"
                to={tagPermalink}
              >
                {label}
              </Link>
            ))}
          </span>
        )}
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

      <article
        className={!isBlogPostPage ? "mb-8 lg:mb-0 max-w-screen-lg" : undefined}
      >
        {renderPostHeader()}
        <article className="prose sm:prose md:prose-md lg:prose-lg mx-auto">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </article>
      </article>
    </>
  );
}

export default BlogPostItem;
