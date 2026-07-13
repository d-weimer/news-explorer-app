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

import { mockArticles, API_KEY } from "../../utils/constants.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState(mockArticles);

  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
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
                <Header
                  handleRegisterClick={handleRegisterClick}
                  handleLoginClick={handleLoginClick}
                  isLoggedIn={isLoggedIn}
                />
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
                  <Header
                    handleRegisterClick={handleRegisterClick}
                    handleLoginClick={handleLoginClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <SavedNews articles={articles} />
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
