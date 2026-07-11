import React from "react";

import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({ articles }) {
  return (
    <ul className="news-card-list">
      {articles.map((item, index) => (
        <NewsCard key={index} article={item} />
      ))}
    </ul>
  );
}

export default NewsCardList;
