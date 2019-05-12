const topHeadlinesUrl = (country) =>
  `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${
    process.env.NEWS_API_KEY
  }`;

export default topHeadlinesUrl;
