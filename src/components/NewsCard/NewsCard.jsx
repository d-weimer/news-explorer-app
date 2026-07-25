import React, { useState } from "react";

import "./NewsCard.css";
import defaultCardImage from "../../assets/image-not-found.png";
import { formatDate } from "../../utils/formatDate";

function NewsCard({
  article,
  isLoggedIn = false,
  isSavedNewsPage = false,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
}) {
  const imageUrl = article.urlToImage || article.image;
  const publishedDate = article.publishedAt || article.date;
  const descriptionText = article.description || article.text;
  const sourceName =
    typeof article.source === "object" ? article.source?.name : article.source;
  const keywordTag = article.keyword || article.tag;

  const [isFallbackActive, setIsFallbackActive] = useState(!imageUrl);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedArticles.some((saved) => saved.url === article.url);

  const handleImageError = (e) => {
    e.target.src = defaultCardImage;
    setIsFallbackActive(true);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;

    if (isSaved) {
      onDeleteArticle?.(article);
    } else {
      onSaveArticle?.(article);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteArticle?.(article);
  };

  const imageClassName = `news-card__image ${
    isFallbackActive ? "news-card__image_type_fallback" : ""
  }`;

  const bookmarkButtonClassName = `news-card__button news-card__button_type_bookmark ${
    isSaved ? "news-card__button_marked" : ""
  }`;

  return (
    <li className="news-card">
      <img
        className={imageClassName}
        src={imageUrl || defaultCardImage}
        alt={article.title || "Article image"}
        onError={handleImageError}
      />

      {/* Keyword tag on saved articles page */}
      {isSavedNewsPage && keywordTag && (
        <span className="news-card__keyword">{keywordTag}</span>
      )}

      {/* Action button & Tooltip container */}
      <div className="news-card__action-container">
        {isSavedNewsPage ? (
          <>
            {isHovered && (
              <span className="news-card__tooltip">Remove from saved</span>
            )}
            <button
              className="news-card__button news-card__button_type_trash"
              type="button"
              aria-label="Remove article"
              onClick={handleDeleteClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </>
        ) : (
          <>
            {!isLoggedIn && isHovered && (
              <span className="news-card__tooltip">
                Sign in to save articles
              </span>
            )}
            <button
              className={bookmarkButtonClassName}
              type="button"
              aria-label="Save article"
              onClick={handleBookmarkClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </>
        )}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedDate)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{descriptionText}</p>
        <p className="news-card__source">{sourceName}</p>
      </div>
    </li>
  );
}

export default NewsCard;
