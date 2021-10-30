import React from "react";

export const Button = ({children, type, name, className}) => {
  return (
    <button
      type={type}
      name={name}
      className={`flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-[color:var(--ifm-color)]  text-[color:var(--ifm-background-color)]
      hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--ifm-color)] ${className}`}
    >
      {children}
    </button>
  );
};
