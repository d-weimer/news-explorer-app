import React from "react";

import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import notFoundIcon from "../../assets/not-found.svg";

function Main({
  articles,
  isLoading,
  hasNoResults,
  searchError,
  hasSearched,
  visibleCount,
  handleShowMore,
}) {
  if (!hasSearched) {
    return null;
  }

  return (
    <main className="main-content">
      {isLoading && <Preloader />}

      {hasNoResults && !isLoading && !searchError && (
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

      {searchError && !isLoading && (
        <div className="main-content__status-container">
          <p className="main-content__status-text">
            Sorry, something went wrong during the request. Please try again
            later.
          </p>
        </div>
      )}

      {!isLoading && !hasNoResults && !searchError && articles.length > 0 && (
        <div className="main-content__results">
          <h2 className="main-content__title">Search results</h2>

          <NewsCardList articles={articles.slice(0, visibleCount)} />

          {visibleCount < articles.length && (
            <button
              className="main-content__more-button"
              type="button"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default Main;
