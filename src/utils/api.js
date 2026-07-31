export const getItems = (token) => {
  return new Promise((resolve) => {
    const savedArticles =
      JSON.parse(localStorage.getItem("mockSavedArticles")) || [];
    resolve(savedArticles);
  });
};

export const addItem = (article, token, keyword = "General") => {
  return new Promise((resolve) => {
    const savedArticles =
      JSON.parse(localStorage.getItem("mockSavedArticles")) || [];

    const newArticle = {
      _id: `fake-article-${Date.now()}`,
      keyword: article.keyword || keyword,
      title: article.title,
      text: article.description || article.text,
      date: article.publishedAt || article.date,
      source: article.source?.name || article.source,
      link: article.url || article.link,
      image: article.urlToImage || article.image,
      url: article.url,
    };

    const updatedArticles = [...savedArticles, newArticle];
    localStorage.setItem("mockSavedArticles", JSON.stringify(updatedArticles));

    resolve(newArticle);
  });
};

export const removeItem = (articleId, token) => {
  return new Promise((resolve) => {
    const savedArticles =
      JSON.parse(localStorage.getItem("mockSavedArticles")) || [];

    const updatedArticles = savedArticles.filter(
      (item) => item._id !== articleId,
    );

    localStorage.setItem("mockSavedArticles", JSON.stringify(updatedArticles));

    resolve({ message: "Article successfully deleted" });
  });
};
