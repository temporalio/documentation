import React from "react";

export const Community = () => {
  return (
    <section className="my-20">
      <h2 className="text-3xl md:text-4xl mb-8 font-semibold">
        Join the Temporal community
      </h2>
      <ul className="grid sm:grid-cols-2  gap-6 xl:gap-8">
        <li>
          <a
            href="https://community.temporal.io/"
            className="flex items-start space-x-4"
          >
            <svg
              className="flex-none w-12 h-12 "
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 0H12C5.37258 0 0 5.37258 0 12V36C0 42.6274 5.37258 48 12 48H36C42.6274 48 48 42.6274 48 36V12C48 5.37258 42.6274 0 36 0Z"
                fill="black"
              />
              <path
                d="M30.3095 17.6905C29.4593 11.3193 27.3067 6 24 6C20.6942 6 18.5416 11.3184 17.6905 17.6905C11.3193 18.5407 6 20.6933 6 24C6 27.3058 11.3193 29.4584 17.6905 30.3095C18.5407 36.6798 20.6933 42 24 42C27.3058 42 29.4584 36.6807 30.3095 30.3095C36.6807 29.4584 42 27.3067 42 24C42 20.6933 36.6798 18.5407 30.3095 17.6905ZM17.4833 28.4526C11.381 27.5711 7.82284 25.5539 7.82284 23.9991C7.82284 22.4443 11.3819 20.4271 17.4833 19.5456C17.3488 21.0147 17.2788 22.5143 17.2788 23.9991C17.2788 25.4839 17.3488 26.9853 17.4833 28.4526ZM24.0009 7.82192C25.5557 7.82192 27.5729 11.381 28.4544 17.4823C26.9862 17.3479 25.4857 17.2779 24.0009 17.2779C22.5161 17.2779 21.0157 17.3479 19.5474 17.4823C20.4289 11.3801 22.4461 7.82192 24.0009 7.82192ZM30.5177 28.4526C30.2174 28.4968 28.985 28.6405 28.6736 28.6718C28.6432 28.984 28.4977 30.2155 28.4544 30.5158C27.5729 36.6181 25.5557 40.1772 24.0009 40.1772C22.4461 40.1772 20.4289 36.6181 19.5474 30.5158C19.5041 30.2155 19.3586 28.9831 19.3282 28.6718C19.1864 27.2257 19.1007 25.6718 19.1007 23.9991C19.1007 22.3273 19.1864 20.7734 19.3282 19.3255C20.7743 19.1836 22.3282 19.0979 24.0009 19.0979C25.6727 19.0979 27.2266 19.1836 28.6736 19.3255C28.9859 19.3558 30.2174 19.5014 30.5177 19.5447C36.6199 20.4262 40.1799 22.4443 40.1799 23.9982C40.179 25.552 36.6199 27.5711 30.5177 28.4526Z"
                fill="#F2F2F2"
              />
            </svg>

            <div className="flex-auto">
              <h3 className="font-semibold">Temporal Community</h3>
              <p>
                Join the Temporal community where you can start discussions and
                ask questions
              </p>
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
              className="flex-none text-red-500 w-12 h-12 "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M36.83 18.556c0-2.285-1.681-4.124-3.758-4.124a184.713 184.713 0 00-8.615-.182h-.914c-2.925 0-5.799.05-8.612.183-2.072 0-3.753 1.848-3.753 4.133A75.6 75.6 0 0011 23.99a78.487 78.487 0 00.173 5.429c0 2.285 1.68 4.139 3.753 4.139 2.955.137 5.987.198 9.07.192 3.087.01 6.11-.054 9.069-.193 2.077 0 3.758-1.853 3.758-4.138.121-1.813.177-3.62.172-5.434a73.982 73.982 0 00-.165-5.428zM21.512 28.97v-9.979l7.363 4.987-7.363 4.992z"
                fill="currentColor"
                className="text-red-50"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-semibold">YouTube</h3>
              <p>Watch tutorials and screencasts from the Temporal team</p>
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
              className="flex-none text-blue-400 w-12 h-12 "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M37.127 15.989h-.001a11.04 11.04 0 01-3.093.836 5.336 5.336 0 002.37-2.932 10.815 10.815 0 01-3.421 1.284 5.42 5.42 0 00-3.933-1.679c-2.976 0-5.385 2.373-5.385 5.3-.003.406.044.812.138 1.207a15.351 15.351 0 01-11.102-5.54 5.235 5.235 0 00-.733 2.663c0 1.837.959 3.461 2.406 4.413a5.338 5.338 0 01-2.449-.662v.066c0 2.57 1.86 4.708 4.32 5.195a5.55 5.55 0 01-1.418.186c-.34 0-.68-.033-1.013-.099.684 2.106 2.676 3.637 5.034 3.68a10.918 10.918 0 01-6.69 2.269 11.21 11.21 0 01-1.285-.077 15.237 15.237 0 008.242 2.394c9.918 0 15.337-8.077 15.337-15.083 0-.23-.006-.459-.017-.683a10.864 10.864 0 002.686-2.746l.007.008z"
                fill="currentColor"
                className="text-white"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-semibold">Twitter</h3>
              <p>Follow Temporal on Twitter to receive news and updates</p>
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
              className="flex-none text-black w-12 h-12 "
            >
              <rect width="48" height="48" rx="12"></rect>
              <path
                d="M23.997 12a12 12 0 00-3.792 23.388c.6.12.816-.264.816-.576l-.012-2.04c-3.336.72-4.044-1.608-4.044-1.608-.552-1.392-1.332-1.764-1.332-1.764-1.08-.744.084-.72.084-.72 1.2.084 1.836 1.236 1.836 1.236 1.08 1.824 2.808 1.296 3.492.996.12-.78.42-1.308.756-1.608-2.664-.3-5.46-1.332-5.46-5.928 0-1.32.468-2.388 1.236-3.228a4.32 4.32 0 01.12-3.168s1.008-.324 3.3 1.224a11.496 11.496 0 016 0c2.292-1.56 3.3-1.224 3.3-1.224.66 1.644.24 2.88.12 3.168.768.84 1.236 1.92 1.236 3.228 0 4.608-2.808 5.616-5.484 5.916.432.372.816 1.104.816 2.22l-.012 3.3c0 .312.216.696.828.576A12 12 0 0023.997 12z"
                fill="currentColor"
                className="text-gray-50"
              ></path>
            </svg>
            <div className="flex-auto">
              <h3 className="font-semibold">GitHub</h3>
              <p>Check out Temporal on GitHub</p>
            </div>
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-semibold tracking-wide mt-8 mb-8">
        Community SDKs (unofficial)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <a
          href="https://github.com/coinbase/temporal-ruby"
          className="flex space-x-5 items-center"
        >
          <img className="w-8 h-8" src="/img/ruby.svg" alt="Ruby logo" />
          <p>Ruby</p>
        </a>
        <a
          href="https://github.com/firdaus/temporal-python-sdk"
          className="flex space-x-5 items-center"
        >
          <img className="w-8 h-8" src="/img/python.svg" alt="Python logo" />
          <p>Python</p>
        </a>
      </div>
    </section>
  );
};
