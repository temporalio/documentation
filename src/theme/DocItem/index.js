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
import { MainHeading } from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useActivePlugin, useVersions } from "@theme/hooks/useDocs";
import useWindowSize from "@theme/hooks/useWindowSize";

function DocItem(props) {
  const { content: DocContent, versionMetadata } = props;
  const { metadata, frontMatter } = DocContent;
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
  const { pluginId } = useActivePlugin({
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

      <div className="row">
        <div
          className={clsx("col", {
            [styles.docItemCol]: !hideTableOfContents,
          })}
        >
          <DocVersionBanner versionMetadata={versionMetadata} />
          <div className={styles.docItemContainer}>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    Version: {versionMetadata.label}
                  </span>
                </div>
              )}

              {renderTocMobile && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  className={styles.tocMobile}
                />
              )}

              <div className="markdown">
                {/*
                  Title can be declared inside md content or declared through frontmatter and added manually
                  To make both cases consistent, the added title is added under the same div.markdown block
                  See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                  */}
                {shouldAddTitle && <MainHeading>{title}</MainHeading>}
                <DocContent />
              </div>
            </article>
            {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
              <div className={styles.EditThisPage}>
                <div className="row">
                  <div className="col">
                    {editUrl && <EditThisPage editUrl={editUrl} />}
                  </div>
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
              <TemporalCloudForm />
            </div>
            <div className="margin-vert--lg">
              <DocPaginator metadata={metadata} />
            </div>
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
    <div className={styles.formFeature}>
      <h2>Get notified of updates</h2>
      <form
        action="https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&amp;id=bbbbd4709f"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate="novalidate"
        className="validate"
      >
        <div id="mc_embed_signup_scroll" className="signup_controls">
          <div className={styles.email_wrap}>
            <label htmlFor="mce-EMAIL" className="sr-only">
              Email:
            </label>
            <input
              className="signUpInput"
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Your email"
              required="required"
            />
          </div>
          <span className="cta_text" style={{ display: "none" }}>
            You are in the waitlist!
          </span>
          <input
            type="submit"
            name="waitlist"
            id="mc-embedded-waitlist"
            className={clsx(
              "button button--outline button-secondary button--md",
              styles.cloudWaitlistSubmit
            )}
          />
        </div>
      </form>
    </div>
  );
}
export default DocItem;
