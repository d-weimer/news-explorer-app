import "./SearchForm.css";

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="search-content">
      <div className="search-content__container">
        <h1 className="search-content__title">What's going on in the world?</h1>
        <p className="search-content__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-form__input"
            placeholder="Enter topic"
            required
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
