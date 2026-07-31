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
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

import { getNewsArticles } from "../../utils/NewsApi.js";
import { registerUser, authorizeUser, getUserInfo } from "../../utils/auth.js";
import { getItems, addItem, removeItem } from "../../utils/api.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");

  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data || res);
        })
        .catch((err) => console.error("Token validation error:", err));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      getItems(jwt)
        .then((data) => setSavedArticles(data))
        .catch((err) => console.error("Failed to load saved articles:", err));
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn]);

  function handleRegister({ email, password, name }) {
    registerUser({ email, password, name })
      .then(() => {
        setActiveModal("success");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  }

  const handleLogin = ({ email, password }) => {
    authorizeUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();
          return getUserInfo(res.token);
        }
      })
      .then((userRes) => {
        if (userRes) setCurrentUser(userRes.data || userRes);
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSaveArticle = (articleToSave) => {
    const jwt = localStorage.getItem("jwt");
    addItem(articleToSave, jwt, currentKeyword)
      .then((savedCard) => {
        setSavedArticles((prevSaved) => [...prevSaved, savedCard]);
      })
      .catch((err) => console.error("Save article error:", err));
  };

  const handleDeleteArticle = (articleToDelete) => {
    const jwt = localStorage.getItem("jwt");
    const targetCard = savedArticles.find(
      (item) =>
        item.url === articleToDelete.url || item._id === articleToDelete._id,
    );
    const targetId = targetCard ? targetCard._id : articleToDelete._id;

    removeItem(targetId, jwt)
      .then(() => {
        setSavedArticles((prevSaved) =>
          prevSaved.filter(
            (item) => item.url !== articleToDelete.url && item._id !== targetId,
          ),
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
                  currentUser={currentUser}
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
                    currentUser={currentUser}
                  />
                  <SavedNews
                    articles={savedArticles}
                    currentUser={currentUser}
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
      />
    </div>
  );
}

export default App;
