"use client";

import React from "react";
import { SearchInputProps } from "@/types";

export const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  placeholder = "Search Pokemon, Move, Ability etc",
  onChange,
  onSearch,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full pl-12 pr-6 py-3.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-slate-200 outline-none transition-all duration-300 text-sm md:text-base font-medium shadow-inner"
        {...props}
      />
    </div>
  );
};
