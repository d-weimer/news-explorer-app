import React from "react";

import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({
  articles = [],
  isLoggedIn,
  isSavedNewsPage = false,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((item, index) => (
        <NewsCard
          key={item._id || item.url || index}
          article={item}
          isLoggedIn={isLoggedIn}
          isSavedNewsPage={isSavedNewsPage}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
