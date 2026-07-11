import React from "react";

import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import notFoundIcon from "../../assets/not-found.svg";

function Main({ articles, isLoading, hasNoResults }) {
  return (
    <main className="main-content">
      {isLoading && (
        <div className="main-content__status-container">
          <div className="main-content__preloader"></div>
          <p className="main-content__status-text">Searching for news...</p>
        </div>
      )}
      {hasNoResults && !isLoading && (
        <div className="main-content__status-container">
          <img
            className="main-content__not-found-icon"
            src={notFoundIcon}
            alt="Not found"
          />
          <h3 className="main-content__not-found-title">Nothing found</h3>
          <p className="main-content__status-text">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      )}
      {!isLoading && !hasNoResults && articles.length > 0 && (
        <div className="main-content__results">
          <h2 className="main-content__title">Search results</h2>
          <NewsCardList articles={articles} />
          <button className="main-content__more-button" type="button">
            Show more
          </button>
        </div>
      )}
    </main>
  );
}

export default Main;
