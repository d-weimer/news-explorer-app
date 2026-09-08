import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getNewsArticles } from "../../utils/newsApi.js";
import * as mainApi from "../../utils/mainApi.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setAuthError("");
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthError("");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data || res);
        })
        .catch((err) => {
          console.error("Token validation error:", err);
          handleLogout();
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      mainApi
        .getSavedArticles(jwt)
        .then((data) => setSavedArticles(data.data || data))
        .catch((err) => console.error("Failed to load saved articles:", err));
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn]);

  function handleRegister({ email, password, name }) {
    setIsSubmitLoading(true);
    setAuthError("");
    mainApi
      .register({ email, password, name })
      .then(() => {
        setActiveModal("success");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setAuthError(typeof err === "string" ? err : "Registration failed");
      })
      .finally(() => setIsSubmitLoading(false));
  }

  const handleLogin = ({ email, password }) => {
    setIsSubmitLoading(true);
    setAuthError("");
    mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();
          return mainApi.getUserInfo(res.token);
        }
      })
      .then((userRes) => {
        if (userRes) setCurrentUser(userRes.data || userRes);
      })
      .catch((err) => {
        console.error("Login error:", err);
        setAuthError(
          typeof err === "string" ? err : "Incorrect email or password",
        );
      })
      .finally(() => setIsSubmitLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleSaveArticle = (articleToSave) => {
    if (!isLoggedIn) {
      handleRegisterClick();
      return;
    }

    const jwt = localStorage.getItem("jwt");
    const formattedArticle = {
      keyword: currentKeyword || "General",
      title: articleToSave.title,
      text: articleToSave.description || articleToSave.text,
      date: articleToSave.publishedAt || articleToSave.date,
      source: articleToSave.source?.name || articleToSave.source,
      link: articleToSave.url || articleToSave.link,
      image: articleToSave.urlToImage || articleToSave.image,
    };

    mainApi
      .saveArticle(formattedArticle, jwt)
      .then((savedCard) => {
        const cardData = savedCard.data || savedCard;
        setSavedArticles((prevSaved) => [...prevSaved, cardData]);
      })
      .catch((err) => console.error("Save article error:", err));
  };

  const handleDeleteArticle = (articleToDelete) => {
    const jwt = localStorage.getItem("jwt");
    const targetCard = savedArticles.find(
      (item) =>
        item.link === articleToDelete.url ||
        item.link === articleToDelete.link ||
        item._id === articleToDelete._id,
    );
    const targetId = targetCard ? targetCard._id : articleToDelete._id;

    mainApi
      .deleteArticle(targetId, jwt)
      .then(() => {
        setSavedArticles((prevSaved) =>
          prevSaved.filter((item) => item._id !== targetId),
        );
      })
      .catch((err) => console.error("Delete article error:", err));
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    const handleOverlayClose = (e) => {
      if (
        e.target.classList.contains("modal_opened") ||
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
    setCurrentKeyword(keyword);

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
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
                    handleLogout={handleLogout}
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
                      handleLogout={handleLogout}
                    />
                    <SavedNews
                      articles={savedArticles}
                      isLoggedIn={isLoggedIn}
                      onDeleteArticle={handleDeleteArticle}
                    />
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
          onRegister={handleRegister}
          authError={authError}
          isLoading={isSubmitLoading}
        />
        <RegisterSuccessModal
          isOpen={activeModal === "success"}
          onCloseModal={closeActiveModal}
          openLoginModal={handleLoginClick}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onCloseModal={closeActiveModal}
          openRegisterModal={handleRegisterClick}
          onLogin={handleLogin}
          authError={authError}
          isLoading={isSubmitLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
