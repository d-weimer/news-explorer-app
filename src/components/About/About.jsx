import "./About.css";
import author from "../../assets/author.png";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          className="about__avatar"
          src={author}
          alt="Daniel Weimer's profile avatar"
        />
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <div className="about__text-block">
            <p className="about__paragraph">
              This block describes the project author. Here you should indicate
              your name, what you do, and which development technologies you
              know.
            </p>
            <p className="about__paragraph">
              You can also talk about your experience with TripleTen, what you
              learned there, and how you can help potential customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
