import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { isExternalHref } from '@site/src/utils/links';

/**
 * Registered as the 'default' navbar item type (see NavbarItem/ComponentTypes),
 * replacing every plain navbar link/label item — top-level and dropdown
 * children alike. Docusaurus's own default opens every absolute URL in a new
 * tab and shows the external-link icon for it, including links to other
 * temporal.io properties (learn.temporal.io, community.temporal.io, etc.).
 * This reimplements that rendering (mirroring NavbarItem/DefaultNavbarItem +
 * NavbarItem/NavbarNavLink) so both the tab behavior and the icon use the
 * temporal.io-aware check instead. It's also the place to add any future
 * top-nav item behavior, since it's ours to extend.
 */
export default function TemporalNavbarLink({
  mobile = false,
  position, // consumed only so it isn't spread onto the DOM
  isDropdownItem = false,
  className,
  activeClassName,
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  prependBaseUrlToHref,
  ...props
}) {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const external = isExternalHref(href ?? to);

  const linkClassName = clsx(
    isDropdownItem ? 'dropdown__link' : mobile ? 'menu__link' : 'navbar__item navbar__link',
    className,
  );
  const resolvedActiveClassName =
    activeClassName ?? (mobile ? 'menu__link--active' : 'navbar__link--active');

  const content = html ? (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <>
      {label}
      {external && <IconExternalLink {...(isDropdownItem && { width: 12, height: 12 })} />}
    </>
  );

  const link = href ? (
    <Link
      className={linkClassName}
      href={prependBaseUrlToHref ? normalizedHref : href}
      {...props}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {content}
    </Link>
  ) : (
    <Link
      className={linkClassName}
      to={toUrl}
      isNavLink
      activeClassName={resolvedActiveClassName}
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
    >
      {content}
    </Link>
  );

  if (isDropdownItem) {
    return <li>{link}</li>;
  }
  if (mobile) {
    return <li className="menu__list-item">{link}</li>;
  }
  return link;
}
