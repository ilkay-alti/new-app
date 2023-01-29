export default function sortNewsByImage(news: NewsResponse) {
  const newsWirhImage = news.data.filter((news) => news.image !== null);
  const newsWithoutImage = news.data.filter((news) => news.image === null);

  const sortedNewsResponse = {
    pagination: news.pagination,
    data: [...newsWirhImage, ...newsWithoutImage],
  };

  return sortedNewsResponse;
}
