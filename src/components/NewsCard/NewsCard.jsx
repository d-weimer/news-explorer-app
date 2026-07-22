import React, { useState } from "react";

import "./NewsCard.css";
import defaultCardImage from "../../assets/image-not-found.png";
import { formatDate } from "../../utils/formatDate";

function NewsCard({
  article,
  isLoggedIn = false,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
}) {
  const [isFallbackActive, setIsFallbackActive] = useState(!article.urlToImage);
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
        src={article.urlToImage || defaultCardImage}
        alt={article.title || "Article image"}
        onError={handleImageError}
      />

      <div className="news-card__action-container">
        {!isLoggedIn && isHovered && (
          <span className="news-card__tooltip">Sign in to save articles</span>
        )}
        <button
          className={bookmarkButtonClassName}
          type="button"
          aria-label="Save article"
          onClick={handleBookmarkClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <p className="news-card__source">{article.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
