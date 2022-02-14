import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

function About() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="About the docs"
      permalink="/about"
      description="General information about Temporal's documentation."
    >
      <main className="margin-vert--lg container">
        <h1>About the docs</h1>
        <div className="margin-bottom--lg">
          <h2 id="latest">Documentation SLA</h2>
          <p>
            Temporal is constantly working to improve and expand its
            documentation. As a result, some components may change without
            notice. Page slugs (URLs), menu labels, and the location of
            information are a few of the items you can expect to see altered as
            we aim to try and give our users the best experience possible.
          </p>
          <p>
            Visit{" "}
            <a href="https://community.temporal.io">community.temporal.io</a>{" "}
            for help if the information you are looking for appears to be
            missing.
          </p>
          <p>
            View the{" "}
            <a href="https://github.com/temporalio/documentation-legacy">
              source repository README
            </a>{" "}
            for contribution guidelines if you are looking to help improve the
            Temporal documentation experience.
          </p>
        </div>
        <div className="margin-bottom--lg">
          <h2 id="next">MIT License</h2>
          <pre>
            <p>
              Copyright (c) 2020 Temporal Technologies Inc. All rights reserved.
            </p>

            <p>Copyright (c) 2017 Uber Technologies, Inc.</p>

            <p>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy
              <br />
              of this software and associated documentation files (the
              "Software"), to deal
              <br />
              in the Software without restriction, including without limitation
              the rights
              <br />
              to use, copy, modify, merge, publish, distribute, sublicense,
              and/or sell
              <br />
              copies of the Software, and to permit persons to whom the Software
              is
              <br />
              furnished to do so, subject to the following conditions:
            </p>

            <p>
              The above copyright notice and this permission notice shall be
              included in
              <br />
              all copies or substantial portions of the Software.
            </p>

            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR
              <br />
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY,
              <br />
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
              SHALL THE
              <br />
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
              OTHER
              <br />
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
              ARISING FROM,
              <br />
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN
              <br />
              THE SOFTWARE.
            </p>
          </pre>
        </div>
      </main>
    </Layout>
  );
}

export default About;
