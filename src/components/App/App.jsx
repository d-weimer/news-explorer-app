import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { mockArticles, API_KEY } from "../../utils/constants.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [articles, setArticles] = useState(mockArticles);

  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);

  const handleSearchSubmit = (keyword) => {
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <Header isLoggedIn={isLoggedIn} />
                <SearchForm />
                <Main
                  articles={articles}
                  isLoading={isLoading}
                  hasNoResults={hasNoResults}
                />
                <About />
              </div>
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="saved-news-page">
                  <Header isLoggedIn={isLoggedIn} />
                  <SavedNews articles={articles} />
                </div>
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
