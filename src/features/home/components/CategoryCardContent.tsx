import React from "react";

interface CategoryCardContentProps {
  name: string;
}

export const CategoryCardContent = ({ name }: CategoryCardContentProps) => {
  return (
    <>
      <span className="text-white text-base md:text-lg font-bold tracking-wide z-10">
        {name}
      </span>

      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className="absolute right-[-15px] bottom-[-15px] w-24 h-24 text-white opacity-15 transform rotate-[25deg] transition-all duration-500 ease-out group-hover:rotate-[55deg] group-hover:scale-110 group-hover:opacity-25"
      >
        <path d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z" />
      </svg>
    </>
  );
};
