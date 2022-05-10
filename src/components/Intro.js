import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

function Explained() {
  return (
    <div className="flex flex-col rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M445.44,33.792H261.12V15.36c0-8.704-6.656-15.36-15.36-15.36S230.4,6.656,230.4,15.36v18.432H46.08 c-8.704,0-15.36,6.656-15.36,15.36v257.536H460.8V49.152C460.8,40.448,454.144,33.792,445.44,33.792z"
            fill="currentColor"
          />
          <path
            d="M476.16,332.288H15.36c-8.192,0-15.36,7.168-15.36,15.36c0,8.704,6.656,15.36,15.36,15.36h199.168l-90.624,95.744 c-5.632,6.144-5.632,15.872,0.512,21.504c6.144,5.632,15.872,5.632,21.504-0.512l84.48-89.088v85.504 c0,8.704,6.656,15.36,15.36,15.36s15.36-6.656,15.36-15.36v-85.504l84.48,89.088c5.632,6.144,15.36,6.656,21.504,0.512 c6.144-5.632,6.656-15.36,0.512-21.504l-90.624-95.744H476.16c8.704,0,15.36-6.656,15.36-15.36 C491.52,338.944,484.864,332.288,476.16,332.288z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">Temporal explained</h2>
      </div>
      <p className="mb-4 flex font-medium">Temporal core concepts explained.</p>
      <ul className="flex list-disc flex-col space-y-2 pl-4">
        <li className="">
          <Link
            to={useBaseUrl("/temporal-explained/workflows")}
            className="hover:underline"
          >
            <a className="font-normal">Temporal Workflows</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/temporal-explained/signals-and-queries")}
            className="hover:underline"
          >
            <a className="font-normal">Signals & Queries</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/temporal-explained/timeouts-and-retries")}
            className="hover:underline"
          >
            <a className="font-normal">Timeouts & retries</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/temporal-explained/visibility")}
            className="hover:underline"
          >
            <a className="font-normal">Visibility</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function SDKs() {
  return (
    <div className="rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7538 3.95126C11.9211 3.87442 12.0617 3.75645 12.16 3.61054C12.2583 3.46463 12.3103 3.29653 12.3103 3.12505C12.3103 2.95357 12.2583 2.78547 12.16 2.63956C12.0617 2.49365 11.9211 2.37567 11.7538 2.29884L6.95069 0.0974684C6.81075 0.0333693 6.65646 0 6.50002 0C6.34358 0 6.18929 0.0333693 6.04935 0.0974684L1.2462 2.29884C1.07895 2.37567 0.938326 2.49365 0.840051 2.63956C0.741776 2.78547 0.689727 2.95357 0.689727 3.12505C0.689727 3.29653 0.741776 3.46463 0.840051 3.61054C0.938326 3.75645 1.07895 3.87442 1.2462 3.95126L6.04935 6.15263C6.18929 6.21673 6.34358 6.2501 6.50002 6.2501C6.65646 6.2501 6.81075 6.21673 6.95069 6.15263L11.7538 3.95126Z"
            fill="currentColor"
          />
          <path
            d="M7.07848 13.3891C6.99477 13.2516 6.95078 13.0968 6.95069 12.9393V7.6124C6.95079 7.44081 7.003 7.27264 7.10147 7.12672C7.19994 6.9808 7.34079 6.86289 7.50824 6.78619L11.5411 4.93785C11.6948 4.86746 11.8655 4.83423 12.0371 4.84132C12.2088 4.8484 12.3756 4.89557 12.5217 4.97833C12.6679 5.0611 12.7885 5.17673 12.8722 5.31424C12.9559 5.45175 12.9999 5.60659 13 5.76406V11.091C12.9999 11.2626 12.9477 11.4307 12.8492 11.5766C12.7507 11.7226 12.6099 11.8405 12.4425 11.9172L8.40958 13.7655C8.25591 13.8359 8.08516 13.8691 7.91355 13.862C7.74193 13.855 7.57513 13.8078 7.42898 13.725C7.28284 13.6423 7.16218 13.5266 7.07848 13.3891Z"
            fill="currentColor"
          />
          <path
            d="M0.96287 4.97833C1.13449 4.97125 1.30523 5.00448 1.45891 5.07487L5.49178 6.9232C5.65922 6.9999 5.80007 7.11781 5.89854 7.26374C5.99701 7.40966 6.04922 7.57783 6.04932 7.74941V13.0763C6.04923 13.2338 6.00524 13.3886 5.92154 13.5261C5.83783 13.6637 5.71718 13.7793 5.57103 13.862C5.42488 13.9448 5.25809 13.992 5.08647 13.9991C4.91485 14.0061 4.7441 13.9729 4.59043 13.9025L0.55756 12.0542C0.390115 11.9775 0.249269 11.8596 0.150797 11.7137C0.0523254 11.5677 0.000115828 11.3996 1.58649e-05 11.228V5.90107C0.000107582 5.7436 0.044094 5.58876 0.127801 5.45125C0.211509 5.31374 0.332161 5.19812 0.478309 5.11535C0.624457 5.03258 0.791253 4.98542 0.96287 4.97833Z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">SDK how-to guides</h2>
      </div>
      <p className="mb-4 flex font-medium">
        SDK specific implementation guides and examples.
      </p>
      <div className="grid grid-cols-2">
        <div>
          <ul className="flex flex-col space-y-2">
            {/* <ul className="grid grid-cols-2 gap-6 xl:gap-8"> */}
            <li className="">
              <Link
                className="flex items-center space-x-3 hover:underline"
                to={useBaseUrl("/go/")}
              >
                <img
                  className="h-8 w-8 transition hover:scale-110 code-logo"
                  src="/img/golang.svg"
                  alt="Go lang logo"
                />
                <p className="font-normal">Go</p>
              </Link>
            </li>
            <li className="">
              <Link
                className="flex items-center space-x-3 hover:underline"
                to={useBaseUrl("/java")}
              >
                <img
                  className="h-8 w-8 transition hover:scale-110 code-logo"
                  src="/img/java.svg"
                  alt="Java logo"
                />
                <p className="font-normal">Java</p>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-col space-y-2">
            {/* <ul className="grid grid-cols-2 gap-6 xl:gap-8"> */}
            <li className="">
              <Link
                className="flex items-center space-x-5"
                to={useBaseUrl("/php/introduction")}
              >
                <div className="flex items-center space-x-3 hover:underline">
                  <img
                    className="h-8 w-8 transition hover:scale-110 code-logo"
                    src="/img/php.svg"
                    alt="PHP logo"
                  />
                  <p className="font-normal">PHP</p>{" "}
                </div>
              </Link>
            </li>
            <li className="">
              <Link to={useBaseUrl("/typescript/introduction")}>
                <div className="flex items-center space-x-3 hover:underline">
                  <img
                    className="h-7 w-7 pl-1 transition hover:scale-110 code-logo"
                    src="/img/typescript.svg"
                    alt="TypeScript logo"
                  />
                  <p className="font-normal">TypeScript</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Cluster() {
  return (
    <div className="flex flex-col rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V4C16 4.53043 15.7893 5.03914 15.4142 5.41421C15.0391 5.78929 14.5304 6 14 6H2C1.46957 6 0.960859 5.78929 0.585786 5.41421C0.210714 5.03914 0 4.53043 0 4V2ZM14 3C14 3.26522 13.8946 3.51957 13.7071 3.70711C13.5196 3.89464 13.2652 4 13 4C12.7348 4 12.4804 3.89464 12.2929 3.70711C12.1054 3.51957 12 3.26522 12 3C12 2.73478 12.1054 2.48043 12.2929 2.29289C12.4804 2.10536 12.7348 2 13 2C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3ZM0 9C0 8.46957 0.210714 7.96086 0.585786 7.58579C0.960859 7.21071 1.46957 7 2 7H14C14.5304 7 15.0391 7.21071 15.4142 7.58579C15.7893 7.96086 16 8.46957 16 9V11C16 11.5304 15.7893 12.0391 15.4142 12.4142C15.0391 12.7893 14.5304 13 14 13H2C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V9ZM14 10C14 10.2652 13.8946 10.5196 13.7071 10.7071C13.5196 10.8946 13.2652 11 13 11C12.7348 11 12.4804 10.8946 12.2929 10.7071C12.1054 10.5196 12 10.2652 12 10C12 9.73478 12.1054 9.48043 12.2929 9.29289C12.4804 9.10536 12.7348 9 13 9C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10Z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">Cluster how-to guides</h2>
      </div>
      <p className="mb-4 flex font-medium">
        Temporal Cluster how-to guides and examples.
      </p>
      <ul className="flex list-disc flex-col space-y-2 pl-4">
        <li className="">
          <Link
            to={useBaseUrl("/clusters/quick-install/#docker-compose")}
            className="hover:underline"
          >
            <a className="font-normal">Run a Cluster using Docker Compose</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl(
              "/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster"
            )}
            className="hover:underline"
          >
            <a className="font-normal">
              Integrate Elasticsearch into your Cluster
            </a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/server/versions-and-dependencies")}
            className="hover:underline"
          >
            <a className="font-normal">Upgrade a Cluster</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/clusters/quick-install/#helm-charts")}
            className="hover:underline"
          >
            <a className="font-normal">Deploy to Kubernetes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Tools() {
  return (
    <div className="rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] code-logo"
          viewBox="0 0 15 15"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.70951 4.76529C9.35941 4.41517 9.35941 3.8475 9.70951 3.49739L11.8346 1.37235C11.3366 1.13367 10.7788 1 10.1897 1C8.08533 1 6.37939 2.70594 6.37939 4.81031C6.37939 5.39939 6.51306 5.95726 6.75172 6.4552L1.37136 11.8355C0.876212 12.3307 0.876212 13.1336 1.37136 13.6286C1.86651 14.1238 2.6693 14.1238 3.16445 13.6286L8.54481 8.24829C9.04275 8.48695 9.60066 8.62062 10.1897 8.62062C12.2941 8.62062 14 6.91468 14 4.81031C14 4.2287 13.8697 3.67752 13.6367 3.18438L11.5166 5.30445C11.1665 5.65458 10.5988 5.65458 10.2487 5.30446L9.70951 4.76529Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5223 8.36487L6.75835 3.08342C7.97767 2.68073 9.53838 3.15399 10.6381 4.37315C11.7378 5.5923 12.0482 7.19339 11.5223 8.36487ZM6.15533 8.43785L6.13426 8.4145C6.13776 8.4184 6.14126 8.4223 6.14478 8.42619C6.14829 8.43009 6.15181 8.43397 6.15533 8.43785Z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">Devtools</h2>
      </div>
      <p className="mb-4 flex font-medium">Tooling how-tos and examples.</p>
      <ul className="flex flex-col space-y-2">
        {/* <ul className="grid grid-cols-2 gap-6 xl:gap-8"> */}
        <li className="">
          <Link
            className="flex items-center space-x-3 hover:underline"
            to={useBaseUrl("/tctl")}
          >
            <svg
              className="h-8 w-8 transition hover:scale-110 code-logo"
              fill="currentColor"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-normal">tctl (CLI)</p>
          </Link>
        </li>
        <li className="">
          <Link
            className="flex items-center space-x-3 hover:underline"
            to={useBaseUrl("/devtools/web-ui")}
          >
            <svg
              className="h-8 w-8 transition hover:scale-110 code-logo"
              fill="currentColor"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-normal">Web UI</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Operation() {
  return (
    <div className="flex flex-col rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m393.72 202.051c4.071 0 7.968-1.655 10.795-4.585l54.445-56.429c5.606-5.812 5.606-15.019 0-20.83l-54.445-56.429c-2.827-2.93-6.724-4.585-10.795-4.585h-92.933v-44.193c0-8.284-6.716-15-15-15h-59.574c-8.284 0-15 6.716-15 15v44.192h-122.127c-16.681 0-30.251 13.57-30.251 30.25v82.358c0 16.681 13.57 30.251 30.251 30.251h122.127v29.999h-92.933c-4.071 0-7.968 1.655-10.795 4.585l-54.445 56.429c-5.606 5.812-5.606 15.019 0 20.83l54.445 56.429c2.827 2.93 6.724 4.585 10.795 4.585h92.933v107.092h-15c-8.284 0-15 6.716-15 15s6.716 15 15 15h119.574c8.284 0 15-6.716 15-15s-6.716-15-15-15h-15v-107.092h122.127c16.681 0 30.251-13.57 30.251-30.25v-82.358c0-16.68-13.57-30.25-30.251-30.25h-122.127v-29.999z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">Operation</h2>
      </div>
      <p className="mb-4 flex font-medium">
        Practical operation guides and information.
      </p>
      <ul className="flex list-disc flex-col space-y-2 pl-4">
        <li className="">
          <a
            href="/operation/how-to-tune-workers"
            className="font-normal hover:underline"
          >
            Tune Workers
          </a>
        </li>
        <li className="">
          <a
            href="/server/production-deployment/"
            className="font-normal hover:underline"
          >
            Deploy to production
          </a>
        </li>
        <li className="">
          <a href="/references/" className="font-normal hover:underline">
            References
          </a>
        </li>
      </ul>
    </div>
  );
}

function Learning() {
  return (
    <div className="flex flex-col rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon "
          height="14"
          viewBox="0 0 511.973 511.973"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m502.332 177.307c-1.414-.614-35.889-15.549-240-104-4.06-1.76-8.66-1.76-12.72 0l-240 104c-12.878 5.569-12.754 23.849 0 29.36 46.624 20.201 122.845 53.234 240 104 4.036 1.75 8.636 1.771 12.72 0 11.125-4.821 162.711-70.509 169.64-73.51v170.381c0 8.618 6.626 16.031 15.235 16.431 9.188.428 16.765-6.888 16.765-15.982v-176.633c0-2.514-1.862-4.637-4.356-4.958-30.031-3.87-171.66-22.15-205.694-26.539-9.844-1.23-15.978-11.198-13.39-20.07 2.03-7.493 9.144-12.266 16.35-11.77.718.042 228.73 29.466 228.567 29.445 4.26.548 7.762 3.276 9.444 6.975 1.176 2.586 4.17 3.771 6.742 2.565 4.305-2.018 8.039-4.674 9.737-10.685 2.186-7.789-1.764-15.864-9.04-19.01z"
            fill="currentColor"
          />
          <path
            d="m236.882 340.027-133.922-58.032c-3.302-1.431-6.988.99-6.988 4.588v57.404c0 53.83 70.28 96 160 96s160-42.17 160-96v-57.404c0-3.598-3.686-6.018-6.988-4.588l-133.932 58.032c-12.16 5.286-25.998 5.282-38.17 0z"
            fill="currentColor"
          />
        </svg>
        <h2 className="mb-4 text-xl font-semibold">Learning</h2>
      </div>
      <p className="mb-4 flex font-medium">Tutorials and learning materials.</p>
      <ul className="flex list-disc flex-col content-start space-y-2 pl-4">
        <li className="">
          <Link
            to={useBaseUrl("/learning-paths/run-your-first-app")}
            className="hover:underline"
          >
            <a className="font-normal">Run your first app</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/learning-paths/hello-world")}
            className="hover:underline"
          >
            <a className="font-normal">"Hello World!" from scratch</a>
          </Link>
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/learning-paths/background-checks")}
            className="hover:underline"
          >
            <a className="font-normal">Background Check project</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss">
      <h1 className="mb-4 text-5xl font-semibold tracking-wide ">
        Temporal Documentation
      </h1>
      <p className="max-w-2xl text-xl">
        Learn about Temporal, the open source platform for orchestrating highly
        reliable, mission-critical applications at scale.
      </p>

      <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <Explained />
        <Learning />
        <SDKs />
        <Tools />
        <Cluster />
        <Operation />
      </div>
    </section>
  );
};
