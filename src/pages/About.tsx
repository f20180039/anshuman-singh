// components/About.tsx
import profilePic from "../assets/profile-pic-2.png";
import experienceIcon from "../assets/experience.png";
import educationIcon from "../assets/education.png";
import arrowIcon from "../assets/arrow.png";

const About = () => {
  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <h1 className="title">About Me</h1>
      <div className="section-container">
        <div className="section__pic-container">
          <img src={profilePic} alt="Profile" className="about-pic" />
        </div>
        <div className="about-details-container">
          <div className="about-containers">
            <div className="details-container">
              <img src={experienceIcon} alt="Experience" className="icon" />
              <h3>Experience</h3>
              <p>
                2.5+ years <br />
                Frontend Development
              </p>
            </div>
            <div className="details-container">
              <img src={educationIcon} alt="Education" className="icon" />
              <h3>Education</h3>
              <p>B.E. Bachelor's Degree</p>
            </div>
          </div>
          <div className="text-container">
            <p>
              Passionate frontend engineer specializing in crafting modern UI
              experiences with React, TypeScript, and TailwindCSS.
            </p>
          </div>
        </div>
      </div>
      <img src={arrowIcon} alt="Arrow" className="icon arrow" />
    </section>
  );
};

export default About;

// const About = () => (
//   <div className="ans-p-8">
//     <h1 className="ans-text-3xl ans-font-bold">About Me</h1>
//     <p className="ans-mt-4">
//       I specialize in React, TypeScript, and modern frontend development.
//     </p>
//   </div>
// );