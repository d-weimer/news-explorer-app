import React from "react";

import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews({
  articles = [],
  currentUser = { name: "Name" },
  isLoggedIn = false,
  onDeleteArticle,
}) {
  const capitalizeKeyword = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getKeywordsString = (items) => {
    if (!items || items.length === 0) return "";

    const keywords = items
      .map((item) => item.keyword || item.tag)
      .filter(Boolean)
      .map(capitalizeKeyword);

    if (keywords.length === 0) return "";

    const frequencyMap = keywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});

    const sortedKeywords = Object.keys(frequencyMap).sort(
      (a, b) => frequencyMap[b] - frequencyMap[a],
    );

    if (sortedKeywords.length === 1) {
      return sortedKeywords[0];
    }
    if (sortedKeywords.length === 2) {
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    }
    if (sortedKeywords.length === 3) {
      return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${sortedKeywords[2]}`;
    }

    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${
      sortedKeywords.length - 2
    } other`;
  };

  const keywordsString = getKeywordsString(articles);

  return (
    <main className="saved-news">
      <section className="saved-news__summary">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.name || "User"}, you have {articles.length} saved
          articles
        </h1>
        {articles.length > 0 && keywordsString && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords_bold">{keywordsString}</span>
          </p>
        )}
      </section>
      <section className="saved-news__container">
        <div className="saved-news__content">
          <NewsCardList
            articles={articles}
            isLoggedIn={isLoggedIn}
            isSavedNewsPage={true}
            onDeleteArticle={onDeleteArticle}
          />
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
