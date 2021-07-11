/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
export default function BlogSidebar({sidebar, row}) {
  if (sidebar.items.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        "thin-scrollbar",
        row && styles.sidebarRow
      )}
    >
      <div className={row && "col col--4"}>
        <h3 className={styles.sidebarItemTitle}>Featured</h3>

        <ul className={styles.sidebarItemList}>
          <li className={styles.sidebarItem}>
            <LinkWrapped href="/blog/tags/case-study/">
              Case Studies
            </LinkWrapped>
          </li>
          <li className={styles.sidebarItem}>
            <LinkWrapped href="/blog/tags/transparency/">
              Transparency Reports
            </LinkWrapped>
          </li>
          <li className={styles.sidebarItem}>
            <LinkWrapped href="/blog/tags/architecture">
              Temporal Architecture
            </LinkWrapped>
          </li>
          <li className={styles.sidebarItem}>
            <LinkWrapped href="/blog/funding-announcement/">
              Series A Funding Announcement
            </LinkWrapped>
          </li>
          <li className={styles.sidebarItem}>
            <LinkWrapped href="/blog/tags/reflections">
              Joining Temporal
            </LinkWrapped>
          </li>
        </ul>
      </div>
      <div className={row && "col col--4"}>
        <a href="/blog">
          <h3 className={styles.sidebarItemTitle}>{sidebar.title}</h3>
        </a>
        <ul className={styles.sidebarItemList}>
          {sidebar.items.slice(0, 4).map((item) => {
            return (
              <li key={item.permalink} className={styles.sidebarItem}>
                <Link
                  isNavLink
                  to={item.permalink}
                  className={styles.sidebarItemLink}
                  activeClassName={styles.sidebarItemLinkActive}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={row && "col col--4"}>
        <h3 className={styles.sidebarItemTitle}>Tags</h3>
        <ul className={clsx(styles.sidebarItemList, styles.tagsList)}>
          <li>
            <LinkWrapped href="/blog/tags/community">#community</LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/errors">#errors</LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/bug">#bug</LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/announcement">
              #announcement
            </LinkWrapped>
          </li>
          {/* <li>
            <LinkWrapped href="/blog/tags/architecture">
              #architecture
            </LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/code-first">#code-first</LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/cloud">#cloud</LinkWrapped>
          </li>
          <li>
            <LinkWrapped href="/blog/tags/stability">#stability</LinkWrapped>
          </li> */}
          <li>
            <LinkWrapped href="/blog/tags">Browse all tags</LinkWrapped>
          </li>
        </ul>
        <div>Content request? Guest post?</div>
        <p>
          Email: <a href="mailto:docs@temporal.io">docs@temporal.io</a>
        </p>
      </div>
    </div>
  );
}

function LinkWrapped({href, children}) {
  return (
    <Link
      isNavLink
      to={href}
      className={styles.sidebarItemLink}
      activeClassName={styles.sidebarItemLinkActive}
    >
      {children}
    </Link>
  );
}
