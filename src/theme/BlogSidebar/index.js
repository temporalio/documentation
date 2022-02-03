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
      url: "/blog/tags/bug",
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
        <ul className="mt-4 flex flex-col space-y-2">
          {featured.map(({title, url}, i) => (
            <li key={i} className="flex items-center space-x-1">
              <svg
                className="h-4 w-4"
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
            <span className="mb-5 flex flex-wrap">
              {tags.map(({title, url}) => (
                <Link
                  key={url}
                  className="my-2 mr-2 inline-flex items-center rounded-full bg-[color:var(--ifm-badge-background-color)] px-3 py-0.5 text-sm font-medium text-[color:var(--ifm-color)] no-underline hover:opacity-80"
                  to={url}
                >
                  {title}
                </Link>
              ))}
            </span>
          }
        </ul>
      </div>
    </div>
  );
}
