import React from "react";

import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <li className="news-card">
      <img
        className="news-card__image"
        src={article.urlToImage}
        alt={article.title}
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
