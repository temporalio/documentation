import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export default function Security() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout title="Leadership" permalink="/Leadership" description="<head />">
      <div className="w-auto mx-auto my-15">
        <ul className="text-center">
          <li className="my-7">
            <span className="font-semibold text-xl">Maxim Fateev CEO</span>
            <img
              className="w-40 mx-auto my-3"
              alt="Maxim Fateev"
              src="https://avatars.githubusercontent.com/u/1463622"
            />
            <a className="" href="https://twitter.com/mfateev">
              https://twitter.com/mfateev
            </a>
          </li>
          <li className="my-7">
            <span className="font-semibold text-xl">Charles Zedlewski CPO</span>
            <img
              className="w-40 mx-auto my-3"
              alt="Charles Zedlewski"
              src="https://media-exp1.licdn.com/dms/image/C5603AQGgvr2dqvuBsQ/profile-displayphoto-shrink_800_800/0/1610115430759?e=1649894400&v=beta&t=NSeRh4iGGhoNJqRun59E4ZxV5U6BT56zRsBgeVg90Mg"
            />
            <a href="https://twitter.com/zedlewski">
              https://twitter.com/zedlewski
            </a>
          </li>
          <li className="my-7">
            <span className="font-semibold text-xl">Samar Abbas CTO</span>
            <img
              className="w-40 mx-auto my-3"
              alt="Samar Abbas"
              src="https://avatars2.githubusercontent.com/u/1766515?s=460&u=42e28f95a37b56ef80c55dbaaadd71bf3fc11261&v=4"
            />
            <a href="https://twitter.com/samarabbas77">
              https://twitter.com/samarabbas77
            </a>
          </li>
          <li className="my-7">
            <span className="font-semibold text-xl">
              Ryland Goldstein Head of Product
            </span>
            <img
              className="w-40 mx-auto my-3"
              alt="Ryland Goldstein"
              src="https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4"
            />
            <a href="https://twitter.com/taillogs">
              https://twitter.com/taillogs
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
