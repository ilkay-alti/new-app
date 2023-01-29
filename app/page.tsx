import { categories } from "@/constants";
import fetchNews from "@/lib/fetchNews";
import React from "react";

async function Homepage() {
  const news: NewsResponse = await fetchNews(categories.join(","));
  return <div>{/* NewsList news */}</div>;
}

export default Homepage;
