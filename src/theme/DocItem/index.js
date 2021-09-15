/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import Seo from "@theme/Seo";
import LastUpdated from "@theme/LastUpdated";
import TOC from "@theme/TOC";
import TOCCollapsible from "@theme/TOCCollapsible";
import EditThisPage from "@theme/EditThisPage";
import {MainHeading} from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";
import {useActivePlugin, useVersions} from "@theme/hooks/useDocs";
import useWindowSize from "@theme/hooks/useWindowSize";
import {Button} from "../../components/shared/Button";

function DocItem(props) {
  const {content: DocContent, versionMetadata} = props;
  const {metadata, frontMatter} = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
  } = frontMatter;
  const {
    description,
    title,
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
  } = metadata;
  const {pluginId} = useActivePlugin({
    failfast: true,
  });
  const versions = useVersions(pluginId); // If site is not versioned or only one version is included
  // we don't show the version badge
  // See https://github.com/facebook/docusaurus/issues/3362

  const showVersionBadge = versions.length > 1; // We only add a title if:
  // - user asks to hide it with frontmatter
  // - the markdown content does not already contain a top-level h1 heading

  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === "undefined";

  const windowSize = useWindowSize();

  const renderTocMobile =
    !hideTableOfContents &&
    DocContent.toc &&
    (windowSize === "mobile" || windowSize === "ssr");

  const renderTocDesktop =
    !hideTableOfContents &&
    DocContent.toc &&
    (windowSize === "desktop" || windowSize === "ssr");

  return (
    <>
      <Seo
        {...{
          title,
          description,
          keywords,
          image,
        }}
      />

      <div id="tailwind" className="flex space-x-20">
        <div
          className={clsx("col", {
            [styles.docItemCol]: !hideTableOfContents,
          })}
        >
          <DocVersionBanner versionMetadata={versionMetadata} />
          <div>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    Version: {versionMetadata.label}
                  </span>
                </div>
              )}

              <article className="prose sm:prose md:prose-md lg:prose-lg mx-auto my-12">
                {renderTocMobile && (
                  <TOCCollapsible
                    toc={DocContent.toc}
                    className={clsx("mb-10 p-3 text-lg", styles.tocMobile)}
                  />
                )}
                {/*
                   Title can be declared inside md content or declared through frontmatter and added manually
                   To make both cases consistent, the added title is added under the same div.markdown block
                   See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                   */}
                {shouldAddTitle && <MainHeading>{title}</MainHeading>}
                <DocContent />
              </article>
              <div>
                {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
                  <div>
                    <div className="edit">
                      {editUrl && <EditThisPage editUrl={editUrl} />}
                    </div>
                    <div>
                      {(lastUpdatedAt || lastUpdatedBy) && (
                        <LastUpdated
                          lastUpdatedAt={lastUpdatedAt}
                          formattedLastUpdatedAt={formattedLastUpdatedAt}
                          lastUpdatedBy={lastUpdatedBy}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="margin-vert--lg">
                  <DocPaginator metadata={metadata} />
                </div>
                <div className="my-8 mx-auto max-w-screen-lg">
                  <TemporalCloudForm />
                </div>
              </div>
            </article>
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </>
  );
}

function TemporalCloudForm() {
  return (
    <div className="max-w-xs my-20">
      <h2 className="text-xl font-bold tracking-wide mb-4">
        Get notified of updates
      </h2>
      <form
        action="https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&amp;id=bbbbd4709f"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate="novalidate"
      >
        <div id="mc_embed_signup_scroll">
          <div className={styles.email_wrap}>
            <label htmlFor="mce-EMAIL" className="sr-only">
              Email
            </label>
            <input
              className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Your email"
              required="required"
            />
          </div>
          <span className="cta_text" style={{display: "none"}}>
            You are on the waitlist!
          </span>
          <Button
            className="mt-4"
            type="submit"
            name="waitlist"
            id="mc-embedded-waitlist"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default DocItem;
