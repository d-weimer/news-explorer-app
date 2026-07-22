import React from "react";

import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((item, index) => (
        <NewsCard
          key={item.url || index}
          article={item}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
