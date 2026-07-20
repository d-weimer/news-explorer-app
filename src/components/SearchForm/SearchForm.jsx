import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter topic");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setPlaceholderText("Please enter a keyword");
      setKeyword("");
      return;
    }

    if (onSearch) {
      onSearch(keyword.trim());
    }
  };

  return (
    <section className="search-content">
      <div className="search-content__container">
        <h1 className="search-content__title">What's going on in the world?</h1>
        <p className="search-content__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="search-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            className="search-form__input"
            placeholder={placeholderText}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (placeholderText !== "Enter topic") {
                setPlaceholderText("Enter topic");
              }
            }}
          />
          <button type="submit" className="search-form__button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
