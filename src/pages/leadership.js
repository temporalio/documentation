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
      <div className="leadership-container">
        <ul className="leadership-list">
          <li className="leadership-list-item">
            <span className="leadership-name">
              Maxim Fateev
              <br />
              CEO
            </span>
            <br />
            <img
              className="leadership-image"
              alt="Maxim Fateev"
              src="https://avatars.githubusercontent.com/u/1463622"
            />
            <br />
            <a className="" href="https://twitter.com/mfateev">
              https://twitter.com/mfateev
            </a>
          </li>
          <li className="leadership-list-item">
            <span className="leadership-name">
              Charles Zedlewski
              <br />
              CPO
            </span>
            <br />
            <img
              className="leadership-image"
              alt="Charles Zedlewski"
              src="https://media-exp1.licdn.com/dms/image/C5603AQGgvr2dqvuBsQ/profile-displayphoto-shrink_200_200/0/1610115430759?e=1656547200&v=beta&t=ZXBpqJ6tFg16m2qREtOXbtB0Eylp0fsCkuxHG7tYBbo"
            />
            <br />
            <a href="https://twitter.com/zedlewski">
              https://twitter.com/zedlewski
            </a>
          </li>
          <li className="leadership-list-item">
            <span className="leadership-name">
              Samar Abbas
              <br />
              CTO
            </span>
            <br />
            <img
              className="leadership-image"
              alt="Samar Abbas"
              src="https://avatars2.githubusercontent.com/u/1766515?s=460&u=42e28f95a37b56ef80c55dbaaadd71bf3fc11261&v=4"
            />
            <br />
            <a href="https://twitter.com/samarabbas77">
              https://twitter.com/samarabbas77
            </a>
          </li>
          <li className="leadership-list-item">
            <span className="leadership-name">
              Ryland Goldstein
              <br />
              Head of Product
            </span>
            <br />
            <img
              className="leadership-image"
              alt="Ryland Goldstein"
              src="https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4"
            />
            <br />
            <a href="https://twitter.com/taillogs">
              https://twitter.com/taillogs
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
