import "./Footer.css";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2026 Supersite, Powered by News API
        </p>
        <div className="footer__navigation">
          <nav className="footer__links">
            <a className="footer__link" href="/">
              Home
            </a>
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </nav>
          <div className="footer__socials">
            <a
              href="https://github.com/d-weimer"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
            >
              <img className="footer__icon" src={github} alt="GitHub" />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-weimer/"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
            >
              <img className="footer__icon" src={linkedin} alt="Linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
