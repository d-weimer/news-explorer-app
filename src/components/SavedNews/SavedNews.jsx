import React from "react";

import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews({ articles, currentUser = { name: "Name" } }) {
  return (
    <main className="saved-news">
      <section className="saved-news__summary">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser.name}, you have {articles.length} saved articles
        </h1>
        <p className="saved-news__keywords">
          By keywords:{" "}
          <span className="saved-news__keywords_bold">
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </section>
      <section className="saved-news__container">
        <div className="saved-news__content">
          <NewsCardList articles={articles} />
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
