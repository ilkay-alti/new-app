"use client";
import { useRouter } from "next/router";
import React from "react";

function SearchBox() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    if (!search) return;
    router.push(`/search?query=${search}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="max-w-6xl mx-auto justify-between  items-center px-5"
    >
      <input
        placeholder="Search Keys..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none w-full h-14 rounded-sm placeholder:bg-gray-500 text-gray-500 bg-transparent dark:text-orange-400"
      />
      <button
        disabled={!search}
        className="text-orange-400 disabled:text-gray-400 "
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;
