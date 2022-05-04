import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";

function PrivacyPolicy() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Temporal Technologies, Inc. Privacy Policy"
      permalink="/privacy-policy"
      description="General information about Temporal's documentation."
    >
      <main className="margin-vert--lg container">
        <h1 id="temporal-technologies-inc-privacy-policy">
          Temporal Technologies, Inc. Privacy Policy
        </h1>
        <p>Last updated: January 20th, 2021</p>
        <p>
          Temporal Technologies Inc. operates{" "}
          <a href="https://temporal.io">https://temporal.io</a> and{" "}
          <a href="https://docs.temporal.io">https://docs.temporal.io</a> (the
          &quot;Sites&quot;). This page informs you of our policies regarding
          the collection, use and disclosure of Personal Information we receive
          from users of the Sites.
        </p>
        <p>
          We use your Personal Information only for providing and improving the
          Sites. By using the Sites, you agree to the collection and use of
          information in accordance with this policy.
        </p>
        <h2 id="information-collection-and-use">
          Information Collection And Use
        </h2>
        <p>
          While using our Sites, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to your name (&quot;Personal Information&quot;).
        </p>
        <h2 id="log-data">Log Data</h2>
        <p>
          Like many site operators, we collect information that your browser
          sends whenever you visit our Sites (&quot;Log Data&quot;). This Log
          Data may include information such as your computer&#39;s Internet
          Protocol (&quot;IP&quot;) address, browser type, browser version, the
          pages of our Sites that you visit, the time and date of your visit,
          the time spent on those pages and other statistics. In addition, we
          may use third party services such as Google Analytics that collect,
          monitor and analyze this data.
        </p>
        <h2 id="communications">Communications</h2>
        <p>
          Depending on the method of collection, we may use your Personal
          Information to contact you with newsletters, marketing or promotional
          materials and other information that we believe is relevant for you.
        </p>
        <h2 id="cookies">Cookies</h2>
        <p>
          Cookies are files with a small amount of data, which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          web site and stored on your computer&#39;s hard drive.
        </p>
        <p>
          Like many sites, we use &quot;cookies&quot; to collect information.
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our Sites.
        </p>
        <h2 id="security">Security</h2>
        <p>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>
        <h2 id="changes-to-this-privacy-policy">
          Changes To This Privacy Policy
        </h2>
        <p>
          This Privacy Policy is effective as of January 1st 2021 and will
          remain in effect except with respect to any changes in its provisions
          in the future, which will be in effect immediately after being posted
          on this page.
        </p>
        <p>
          We reserve the right to update or change our Privacy Policy at any
          time and you should check this Privacy Policy periodically. Your
          continued use of the Service after we post any modifications to the
          Privacy Policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          Privacy Policy.
        </p>
        <p>
          If we make any material changes to this Privacy Policy, we will notify
          you either through the email address you have provided us, or by
          placing a prominent notice on our website.
        </p>
        <h2 id="contact-us">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us.
        </p>
      </main>
    </Layout>
  );
}

export default PrivacyPolicy;
