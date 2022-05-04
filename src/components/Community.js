import React from "react";

export const Community = () => {
  return (
    <section className="my-20">
      <h2 className="mb-8 text-3xl font-semibold md:text-4xl">
        Join the Temporal community
      </h2>
      <ul className="grid gap-6  sm:grid-cols-2 xl:gap-8">
        <li>
          <a
            href="https://community.temporal.io/"
            className="flex items-start space-x-4"
          >
            <svg
              className="h-12 w-12 flex-none "
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 0H12C5.37258 0 0 5.37258 0 12V36C0 42.6274 5.37258 48 12 48H36C42.6274 48 48 42.6274 48 36V12C48 5.37258 42.6274 0 36 0Z"
                fill="var(--ifm-color)"
              />
              <path
                d="M30.3095 17.6905C29.4593 11.3193 27.3067 6 24 6C20.6942 6 18.5416 11.3184 17.6905 17.6905C11.3193 18.5407 6 20.6933 6 24C6 27.3058 11.3193 29.4584 17.6905 30.3095C18.5407 36.6798 20.6933 42 24 42C27.3058 42 29.4584 36.6807 30.3095 30.3095C36.6807 29.4584 42 27.3067 42 24C42 20.6933 36.6798 18.5407 30.3095 17.6905ZM17.4833 28.4526C11.381 27.5711 7.82284 25.5539 7.82284 23.9991C7.82284 22.4443 11.3819 20.4271 17.4833 19.5456C17.3488 21.0147 17.2788 22.5143 17.2788 23.9991C17.2788 25.4839 17.3488 26.9853 17.4833 28.4526ZM24.0009 7.82192C25.5557 7.82192 27.5729 11.381 28.4544 17.4823C26.9862 17.3479 25.4857 17.2779 24.0009 17.2779C22.5161 17.2779 21.0157 17.3479 19.5474 17.4823C20.4289 11.3801 22.4461 7.82192 24.0009 7.82192ZM30.5177 28.4526C30.2174 28.4968 28.985 28.6405 28.6736 28.6718C28.6432 28.984 28.4977 30.2155 28.4544 30.5158C27.5729 36.6181 25.5557 40.1772 24.0009 40.1772C22.4461 40.1772 20.4289 36.6181 19.5474 30.5158C19.5041 30.2155 19.3586 28.9831 19.3282 28.6718C19.1864 27.2257 19.1007 25.6718 19.1007 23.9991C19.1007 22.3273 19.1864 20.7734 19.3282 19.3255C20.7743 19.1836 22.3282 19.0979 24.0009 19.0979C25.6727 19.0979 27.2266 19.1836 28.6736 19.3255C28.9859 19.3558 30.2174 19.5014 30.5177 19.5447C36.6199 20.4262 40.1799 22.4443 40.1799 23.9982C40.179 25.552 36.6199 27.5711 30.5177 28.4526Z"
                fill="var(--ifm-background-color)"
              />
            </svg>

            <div className="flex-auto">
              <h3 className="font-bold">Community Forum</h3>
              <p>Search frequently asked questions and ask your own.</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCGovZyy8OfFPNlNV0i1fI1g"
            className="flex items-start space-x-4"
          >
            <svg
              fill="currentColor"
              className="h-12 w-12 flex-none text-red-500 "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M36.83 18.556c0-2.285-1.681-4.124-3.758-4.124a184.713 184.713 0 00-8.615-.182h-.914c-2.925 0-5.799.05-8.612.183-2.072 0-3.753 1.848-3.753 4.133A75.6 75.6 0 0011 23.99a78.487 78.487 0 00.173 5.429c0 2.285 1.68 4.139 3.753 4.139 2.955.137 5.987.198 9.07.192 3.087.01 6.11-.054 9.069-.193 2.077 0 3.758-1.853 3.758-4.138.121-1.813.177-3.62.172-5.434a73.982 73.982 0 00-.165-5.428zM21.512 28.97v-9.979l7.363 4.987-7.363 4.992z"
                fill="currentColor"
                className="text-red-50"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-bold">YouTube</h3>
              <p>Watch tutorials and meetups with Temporal users.</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://temporal.io/meetup"
            className="flex items-start space-x-4"
          >
            <svg
              width="512"
              height="512"
              viewBox="0 0 512 512"
              className="h-12 w-12 flex-none rounded-lg text-black"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M384 0H128C57.3076 0 0 57.3076 0 128V384C0 454.692 57.3076 512 128 512H384C454.692 512 512 454.692 512 384V128C512 57.3076 454.692 0 384 0Z"
                fill="#2D8CFF"
              />
              <path
                d="M402.164 342.205C408.958 343.904 414.904 340.507 418.301 335.411C420 332.863 420 328.616 420 319.274V191.027C420 181.685 420 178.288 418.301 174.89C415.753 168.096 408.958 165.548 402.164 168.096C384.327 179.986 345.257 214.808 344.408 229.247C343.728 231.795 343.728 236.041 343.728 241.986V274.26C343.728 281.055 343.728 283.603 344.408 287C345.257 293.795 347.805 299.74 351.203 303.137C361.395 310.781 395.369 341.356 403.013 341.356L402.164 342.205ZM93 197.822C93 185.082 93 178.288 95.5481 174.89C97.2468 171.493 102.343 168.096 104.891 165.548C108.288 163 114.234 163 127.823 163H237.39C269.665 163 285.803 163 298.543 169.795C307.886 176.589 318.078 182.534 324.023 195.274C330.818 208.014 330.818 224.151 330.818 256.425V314.178C330.818 326.918 330.818 333.712 328.27 337.11C326.571 340.507 321.475 343.904 318.927 346.452C315.53 349 309.584 349 295.995 349H186.429C154.153 349 138.016 349 125.275 342.205C115.932 335.411 105.74 329.466 99.7948 316.726C93 303.986 93 287.849 93 255.575V197.822Z"
                fill="white"
              />
            </svg>

            <div className="flex-auto">
              <h3 className="font-bold">Meetup</h3>
              <p>Join our monthly meetup and ask questions!</p>
            </div>
          </a>
        </li>

        <li>
          <a
            href="https://github.com/temporalio"
            className="flex items-start space-x-4"
          >
            <svg
              fill="currentColor"
              className="h-12 w-12 flex-none text-black "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M23.997 12a12 12 0 00-3.792 23.388c.6.12.816-.264.816-.576l-.012-2.04c-3.336.72-4.044-1.608-4.044-1.608-.552-1.392-1.332-1.764-1.332-1.764-1.08-.744.084-.72.084-.72 1.2.084 1.836 1.236 1.836 1.236 1.08 1.824 2.808 1.296 3.492.996.12-.78.42-1.308.756-1.608-2.664-.3-5.46-1.332-5.46-5.928 0-1.32.468-2.388 1.236-3.228a4.32 4.32 0 01.12-3.168s1.008-.324 3.3 1.224a11.496 11.496 0 016 0c2.292-1.56 3.3-1.224 3.3-1.224.66 1.644.24 2.88.12 3.168.768.84 1.236 1.92 1.236 3.228 0 4.608-2.808 5.616-5.484 5.916.432.372.816 1.104.816 2.22l-.012 3.3c0 .312.216.696.828.576A12 12 0 0023.997 12z"
                fill="currentColor"
                className="text-gray-50"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-bold">GitHub</h3>
              <p>Give Temporal a star on GitHub (it helps!)</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/temporalio"
            className="flex items-start space-x-4"
          >
            <svg
              fill="currentColor"
              className="h-12 w-12 flex-none text-blue-400 "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M37.127 15.989h-.001a11.04 11.04 0 01-3.093.836 5.336 5.336 0 002.37-2.932 10.815 10.815 0 01-3.421 1.284 5.42 5.42 0 00-3.933-1.679c-2.976 0-5.385 2.373-5.385 5.3-.003.406.044.812.138 1.207a15.351 15.351 0 01-11.102-5.54 5.235 5.235 0 00-.733 2.663c0 1.837.959 3.461 2.406 4.413a5.338 5.338 0 01-2.449-.662v.066c0 2.57 1.86 4.708 4.32 5.195a5.55 5.55 0 01-1.418.186c-.34 0-.68-.033-1.013-.099.684 2.106 2.676 3.637 5.034 3.68a10.918 10.918 0 01-6.69 2.269 11.21 11.21 0 01-1.285-.077 15.237 15.237 0 008.242 2.394c9.918 0 15.337-8.077 15.337-15.083 0-.23-.006-.459-.017-.683a10.864 10.864 0 002.686-2.746l.007.008z"
                fill="currentColor"
                className="text-white"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-bold">Twitter</h3>
              <p>
                Follow <span className="text-blue-400">@temporalio</span> for
                Temporal news and events.
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://temporal.io/slack"
            className="flex items-start space-x-4"
          >
            <svg
              className="h-12 w-12 flex-none text-blue-400 "
              viewBox="0 0 1610 1610"
            >
              <title>slack-logo-icon</title>
              <desc>Created with Sketch Beta.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="Group">
                  <path
                    d="M338.114754,1017.45902 C338.114754,1110.57377 262.04918,1186.63934 168.934426,1186.63934 C75.8196721,1186.63934 -0.245901639,1110.57377 -0.245901639,1017.45902 C-0.245901639,924.344262 75.8196721,848.278689 168.934426,848.278689 L338.114754,848.278689 L338.114754,1017.45902 L338.114754,1017.45902 Z"
                    fill="#E01E5A"
                  ></path>
                  <path
                    d="M423.360656,1017.45902 C423.360656,924.344262 499.42623,848.278689 592.540984,848.278689 C685.655738,848.278689 761.721311,924.344262 761.721311,1017.45902 L761.721311,1441.06557 C761.721311,1534.18033 685.655738,1610.2459 592.540984,1610.2459 C499.42623,1610.2459 423.360656,1534.18033 423.360656,1441.06557 L423.360656,1017.45902 L423.360656,1017.45902 Z"
                    fill="#E01E5A"
                  ></path>
                  <path
                    d="M592.540984,338.114754 C499.42623,338.114754 423.360656,262.04918 423.360656,168.934426 C423.360656,75.8196721 499.42623,-0.245901639 592.540984,-0.245901639 C685.655738,-0.245901639 761.721311,75.8196721 761.721311,168.934426 L761.721311,338.114754 L592.540984,338.114754 L592.540984,338.114754 Z"
                    fill="#36C5F0"
                  ></path>
                  <path
                    d="M592.540984,423.360656 C685.655738,423.360656 761.721311,499.42623 761.721311,592.540984 C761.721311,685.655738 685.655738,761.721311 592.540984,761.721311 L168.934426,761.721311 C75.8196721,761.721311 -0.245901639,685.655738 -0.245901639,592.540984 C-0.245901639,499.42623 75.8196721,423.360656 168.934426,423.360656 L592.540984,423.360656 L592.540984,423.360656 Z"
                    fill="#36C5F0"
                  ></path>
                  <path
                    d="M1271.88525,592.540984 C1271.88525,499.42623 1347.95082,423.360656 1441.06557,423.360656 C1534.18033,423.360656 1610.2459,499.42623 1610.2459,592.540984 C1610.2459,685.655738 1534.18033,761.721311 1441.06557,761.721311 L1271.88525,761.721311 L1271.88525,592.540984 L1271.88525,592.540984 Z"
                    fill="#2EB67D"
                  ></path>
                  <path
                    d="M1186.63934,592.540984 C1186.63934,685.655738 1110.57377,761.721311 1017.45902,761.721311 C924.344262,761.721311 848.278689,685.655738 848.278689,592.540984 L848.278689,168.934426 C848.278689,75.8196721 924.344262,-0.245901639 1017.45902,-0.245901639 C1110.57377,-0.245901639 1186.63934,75.8196721 1186.63934,168.934426 L1186.63934,592.540984 L1186.63934,592.540984 Z"
                    fill="#2EB67D"
                  ></path>
                  <path
                    d="M1017.45902,1271.88525 C1110.57377,1271.88525 1186.63934,1347.95082 1186.63934,1441.06557 C1186.63934,1534.18033 1110.57377,1610.2459 1017.45902,1610.2459 C924.344262,1610.2459 848.278689,1534.18033 848.278689,1441.06557 L848.278689,1271.88525 L1017.45902,1271.88525 L1017.45902,1271.88525 Z"
                    fill="#ECB22E"
                  ></path>
                  <path
                    d="M1017.45902,1186.63934 C924.344262,1186.63934 848.278689,1110.57377 848.278689,1017.45902 C848.278689,924.344262 924.344262,848.278689 1017.45902,848.278689 L1441.06557,848.278689 C1534.18033,848.278689 1610.2459,924.344262 1610.2459,1017.45902 C1610.2459,1110.57377 1534.18033,1186.63934 1441.06557,1186.63934 L1017.45902,1186.63934 L1017.45902,1186.63934 Z"
                    fill="#ECB22E"
                  ></path>
                </g>
              </g>
            </svg>
            <div className="flex-auto">
              <h3 className="font-bold">Slack</h3>
              <p>Join for live conversations and get support.</p>
            </div>
          </a>
        </li>
      </ul>
      <p className="mt-8">
        We are happy to help you with your{" "}
        <a
          className="text-blue-400 hover:underline"
          href="https://temporal.io/careers"
        >
          job listings
        </a>
        , talks, blogposts (whether on our blog or yours) or anything else you
        want to try. Just{" "}
        <a
          className="text-blue-400 hover:underline"
          href="mailto:swyx@temporal.io"
        >
          get in touch
        </a>
        !
      </p>

      <div className="my-16 flex flex-col space-y-6 sm:flex-row sm:space-y-0">
        <div className="flex-1">
          <h2 className="py-6 text-xl font-semibold uppercase tracking-wide">
            Community Distros
          </h2>
          <span className="opacity-70">
            External projects that build atop Temporal
          </span>
          <ul className="mt-8 list-disc space-y-3 pl-4">
            <li className="list-disc">
              <p className="">
                <a
                  href="https://github.com/airbytehq/airbyte"
                  className="font-semibold hover:underline"
                >
                  Airbyte
                </a>
                <span>-</span>
                <a
                  href="https://www.youtube.com/watch?v=K25Bt5asd8I"
                  className=" opacity-80 hover:underline"
                >
                  ELT data pipeline platform (see talk){" "}
                  <svg
                    className="mb-1 inline h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </p>
            </li>
            <li className="list-disc">
              <a
                href="https://github.com/spiral/roadrunner"
                className="font-semibold hover:underline"
              >
                Roadrunner
              </a>
              <span>-</span>
              <span className="opacity-80">PHP application server</span>
            </li>
            <li className="list-disc">
              <a
                href="https://github.com/coinbase/temporal-ruby"
                className="font-semibold hover:underline"
              >
                Coinbase/temporal-ruby
              </a>
              <span>-</span>
              <span className="opacity-80">
                Ruby SDK with{" "}
                <a
                  className=" opacity-80 hover:underline"
                  href="https://github.com/milk-video/temporal-rails-example"
                >
                  Rails example{" "}
                  <svg
                    className="mb-1 inline h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </span>
            </li>
            <li className="list-disc">
              <a
                href="https://github.com/DataDog/temporalite"
                className="font-semibold hover:underline"
              >
                DataDog/temporalite
              </a>
              <span>-</span>
              <span className="opacity-80">
                Single binary distro for CI (
                <a href="https://www.youtube.com/watch?v=Hz7ZZzafBoE">
                  see talk
                </a>
                )
              </span>
            </li>
            <li className="list-disc">
              <a
                href="https://nunchi.studio/blacksmith/start/onboarding/how"
                className="font-semibold hover:underline"
              >
                Nunchi Blacksmith
              </a>
              <span>-</span>
              <span className="opacity-80">ETL data platform</span>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="py-6 text-xl font-semibold uppercase tracking-wide">
            Community SDKs
          </h2>
          <span className="opacity-70">Third Party SDKs</span>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-2"> */}
          <div className="mt-8 flex flex-col space-y-4">
            <a
              href="https://github.com/coinbase/temporal-ruby"
              className="flex items-center space-x-5"
            >
              <img className="h-8 w-8" src="/img/ruby.svg" alt="Ruby logo" />
              <p>Ruby</p>
            </a>
            <a
              href="https://github.com/firdaus/temporal-python-sdk"
              className="flex items-center space-x-5"
            >
              <img
                className="h-8 w-8"
                src="/img/python.svg"
                alt="Python logo"
              />
              <p>Python</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
