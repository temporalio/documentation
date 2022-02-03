import React from "react";
import Link from "@docusaurus/Link";
import {useThemeConfig} from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import ThemedImage from "@theme/ThemedImage";
import IconExternalLink from "@theme/IconExternalLink";

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({sources, alt}) => (
  <ThemedImage className="footer__logo" alt={alt} sources={sources} />
);

function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  const links = [
    {
      title: "SDKs",
      items: [
        {
          label: "Go SDK",
          to: "/docs/go/getting-started",
        },
        {
          label: "Java SDK",
          to: "/docs/java/introduction",
        },
        {
          label: "PHP SDK",
          to: "/docs/php/introduction",
        },
        {
          label: "TypeScript SDK (alpha)",
          to: "/docs/typescript/introduction",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          label: "Core concepts",
          to: "/docs/temporal-explained/introduction",
        },
        {
          label: "Temporal Server",
          to: "/docs/server/introduction",
        },
        {
          label: "DevTools",
          to: "/docs/devtools/introduction",
        },
        {
          label: "Glossary",
          to: "/docs/reference/glossary",
        },
        {
          label: "Migrate from Cadence",
          to: "/docs/cadence-to-temporal",
        },
        {
          label: "External resources",
          to: "/docs/external-resources",
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          label: "Support Forum",
          href: "https://community.temporal.io/",
        },
        {
          label: "Public Slack",
          href: "https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw",
        },
        {
          label: "Open Office Hours",
          href: "https://lu.ma/temporal",
        },
      ],
    },
    {
      title: "Company",
      items: [
        {
          label: "Case Studies",
          href: "/blog/tags/case-study",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: "Temporal Careers",
          href: "https://temporal.io/careers",
        },
        {
          label: "Temporal Cloud",
          href: "https://temporal.io/cloud",
          // html: `<a href="https://temporal.io/cloud" class="my-2 no-underline inline-flex items-center px-3 py-0.5 rounded-lg text-sm font-medium bg-[color:var(--ifm-color)] text-[color:var(--ifm-background-color)] hover:text-blue-500 hover:opacity-90">Temporal Cloud</a>`,
        },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="bg-[var(--ifm-footer-background-color)] mx-auto w-full max-w-screen-lg">
        {links && links.length > 0 && (
          <div className="row mx-auto grid max-w-screen-lg grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-4">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <div className="footer__title">{linkItem.title}</div>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src || logo.srcDark) && (
              <div className="margin-bottom--sm inline hover:opacity-90">
                {logo.href ? (
                  <Link href={logo.href}>
                    <FooterLogo alt={logo.alt} sources={sources} />
                  </Link>
                ) : (
                  <FooterLogo alt={logo.alt} sources={sources} />
                )}
              </div>
            )}
            {copyright ? (
              <div
                className="mb-4 opacity-80" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
