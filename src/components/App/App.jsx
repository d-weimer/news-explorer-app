import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <SearchForm />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
