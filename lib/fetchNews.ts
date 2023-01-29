import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  const query = gql`
    query myQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        keywords: $keywords
        countries: "us"
        sort: "published_desc"
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;
  // Fetch function with Next.js 13 catching

  const res = await fetch(
    "https://harbin.stepzen.net/api/kissing-wombat/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log("loading new data from API for category: ", category, keywords);

  const newsResponse = await res.json();
  // Sort function by images vs not images present
  console.log(newsResponse);
  if (newsResponse.data.myQuery === null) {
    console.log("newsResponse data null");
  }

  const news = sortNewsByImage(newsResponse.data.myQuery);

  // Return news
  return news;
};

export default fetchNews;

// stepzen import curl  http://api.mediastack.com/v1/news?access_key=1e24336eb5a9ec7283bc51f03f2f121c
// http://api.mediastack.com/v1/news?access_key=
