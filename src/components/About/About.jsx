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
              Hi, I'm Daniel Weimer! I'm an aspiring Full-stack Software
              Engineer with a robust background in full-stack development, QA
              engineering, and technical project management. <br />
              <br />
              I love taking complex visual prototypes and design layouts and
              turning them into clean, scalable applications, whether I'm
              working with vanilla JavaScript or building modern React apps and
              Node.js backends. <br />
              <br />
              Core Technologies & Skills: <br />- Frontend Development: HTML5,
              CSS3, JavaScript, React.js, Vite <br />- Backend & Database:
              Node.js, Express.js, MongoDB, RESTful APIs <br />- Systems &
              Deployment: Git/GitHub, GCP, Nginx, PM2, Fetch API <br /> -
              Management & QA: Agile/Scrum sprint lifecycles, Cross-platform
              regression testing, Bug tracking, Technical project management
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
