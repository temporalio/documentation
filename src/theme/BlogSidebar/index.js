import React from "react";
import Link from "@docusaurus/Link";
export default function BlogSidebar({sidebar, row}) {
  if (sidebar.items.length === 0) {
    return null;
  }

  const tags = [
    {
      title: "community",
      url: "/blog/tags/community",
    },
    {
      title: "errors",
      url: "/blog/tags/errors",
    },
    {
      title: "bugs",
      url: "/blog/tags/bugs",
    },
    {
      title: "announcement",
      url: "/blog/tags/announcement",
    },
  ];

  const featured = [
    {
      title: "Transparency reports",
      url: "/blog/tags/transparency/",
    },
    {
      title: "Temporal Architecture",
      url: "/blog/tags/architecture/",
    },
    {
      title: "Funding announcement",
      url: "/blog/funding-announcement",
    },
    {
      title: "Joining Temporal",
      url: "/blog/tags/reflections/",
    },
  ];
  return (
    <div>
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold">Featured</h3>
        <ul className="flex flex-col space-y-2 mt-4">
          {featured.map(({title, url}, i) => (
            <li key={i} className="flex space-x-1 items-center">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link to={url} className="hover:underline" href={url}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={row && "col col--4"}>
        <h3 className="mb-2 text-xl font-semibold">Tags</h3>
        <ul>
          {
            <span className="flex flex-wrap mb-5">
              {tags.map(({title, url}) => (
                <Link
                  key={url}
                  className="mr-2 my-2 no-underline inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[color:var(--ifm-badge-background-color)] text-[color:var(--ifm-color)] hover:opacity-80"
                  to={url}
                >
                  {title}
                </Link>
              ))}
            </span>
          }
        </ul>
        <div>Content request? Guest post?</div>
        <p>
          Email: <a href="mailto:docs@temporal.io">docs@temporal.io</a>
        </p>
      </div>
    </div>
  );
}
