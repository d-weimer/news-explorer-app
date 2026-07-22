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
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

import { getNewsArticles } from "../../utils/NewsApi.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const handleSaveArticle = (articleToSave) => {
    setSavedArticles((prevSaved) => [...prevSaved, articleToSave]);
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prevSaved) =>
      prevSaved.filter((item) => item.url !== articleToDelete.url),
    );
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    const handleOverlayClose = (e) => {
      if (
        e.target.classList.contains("modal__opened") ||
        e.target.classList.contains("modal")
      ) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [activeModal]);

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setHasNoResults(false);
    setSearchError(false);
    setArticles([]);
    setVisibleCount(3);

    getNewsArticles(keyword)
      .then((data) => {
        if (!data.articles || data.articles.length === 0) {
          setHasNoResults(true);
        } else {
          setArticles(data.articles);
        }
      })
      .catch((err) => {
        console.error("News request error:", err);
        setSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <Header
                  handleRegisterClick={handleRegisterClick}
                  handleLoginClick={handleLoginClick}
                  isLoggedIn={isLoggedIn}
                />
                <SearchForm onSearch={handleSearchSubmit} />
                <Main
                  articles={articles}
                  isLoading={isLoading}
                  hasNoResults={hasNoResults}
                  searchError={searchError}
                  hasSearched={hasSearched}
                  visibleCount={visibleCount}
                  handleShowMore={handleShowMore}
                  isLoggedIn={isLoggedIn}
                  savedArticles={savedArticles}
                  onSaveArticle={handleSaveArticle}
                  onDeleteArticle={handleDeleteArticle}
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
                  <Header
                    handleRegisterClick={handleRegisterClick}
                    handleLoginClick={handleLoginClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <SavedNews articles={savedArticles} />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
      <RegisterModal
        isOpen={activeModal === "register"}
        onCloseModal={closeActiveModal}
        openLoginModal={handleLoginClick}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onCloseModal={closeActiveModal}
        openRegisterModal={handleRegisterClick}
      />
    </div>
  );
}

export default App;
