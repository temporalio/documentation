/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Link from "@docusaurus/Link";

function Tag(props) {
  const {permalink, name, count} = props;
  return (
    <Link
      href={permalink}
      className={`mr-2 my-2 no-underline inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[color:var(--ifm-badge-background-color)] text-[color:var(--ifm-color)] hover:opacity-80 ${
        count ? "" : ""
      }`}
    >
      {name}
      {count && (
        <span className="ml-2 text-xs inline-flex items-center justify-center px-2 py-1 font-bold leading-none rounded-full text-[color:var(--ifm-badge-background-color)] bg-[color:var(--ifm-color)]">
          {count}
        </span>
      )}
    </Link>
  );
}

export default Tag;
