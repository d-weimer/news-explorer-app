import React, { useState } from "react";

import "./NewsCard.css";
import defaultCardImage from "../../assets/image-not-found.png";

function NewsCard({ article }) {
  const [isFallbackActive, setIsFallbackActive] = useState(!article.urlToImage);

  const handleImageError = (e) => {
    e.target.src = defaultCardImage;
    setIsFallbackActive(true);
  };

  const imageClassName = `news-card__image ${
    isFallbackActive ? "news-card__image_type_fallback" : ""
  }`;

  return (
    <li className="news-card">
      <img
        className={imageClassName}
        src={article.urlToImage || defaultCardImage}
        alt={article.title}
        onError={handleImageError}
      />
      <div className="news-card__action-container">
        <button
          className="news-card__button news-card__button_type_bookmark"
          type="button"
          aria-label="Save article"
        />
      </div>
      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
