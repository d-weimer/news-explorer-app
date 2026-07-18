import React from "react";

import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import notFoundIcon from "../../assets/not-found.svg";

function Main({ articles, isLoading, hasNoResults }) {
  return (
    <main className="main-content">
      {isLoading && <Preloader />}

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
