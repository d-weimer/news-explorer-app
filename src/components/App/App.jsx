import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import About from "../About/About.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { mockArticles, API_KEY } from "../../utils/constants.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [articles, setArticles] = useState(mockArticles);

  const handleSearchSubmit = (keyword) => {
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm />
                <section className="main-content">
                  <h2 className="main-content__title">Search results</h2>
                  <ul className="main-content__grid">
                    {articles.map((item, index) => (
                      <NewsCard key={index} article={item} />
                    ))}
                  </ul>
                  <button className="main-content__more-button" type="button">
                    Show more
                  </button>
                </section>
                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews articles={articles} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
