import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { particlesConfig } from "../../assets/particlesConfig";
import ceo from "../../images/ceo.png";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";

function About() {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  return (
    <motion.div
      className="about"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      id="about"
    >
      <Header />
      <section className="about-us">
        <Particles
          className="particles-here"
          init={particlesInit}
          options={particlesConfig}
        />
        <div className="container">
          <div className="about-us__wrapper">
            <div className="about-us__header">
              <h1>
                ABOUT US<span className="shadow">ABOUT US</span>
              </h1>
              <p style={{ fontWeight: 700 }}>
                We are a team of individuals with developed skills and
                professionalisation, each in their field, who are gathered under
                one roof with only one goal. Provide value to the client!
              </p>
            </div>
            <div className="about-us__body">
              <div className="about-us__private">
                <p>
                  <span
                    className="primary"
                    style={{ fontWeight: 700, letterSpacing: "0.2rem" }}
                  >
                    PRIVATE CHARACTERISTIC:
                  </span>
                  <br></br>
                  <br></br> Young, ambitious, serious, silly, different,
                  similar, professional, funny, 24/7 focus on growth,
                  enthusiastic, dedicated with a way of thinking best described
                  by Steve Jobs' sentence:<br></br>
                  <br></br>{" "}
                  <span>
                    "Only those crazy enough to think they can change the world
                    are the ones who do."
                  </span>
                </p>
              </div>
              <div className="about-us__professionaly">
                <p>
                  <span
                    className="primary"
                    style={{ fontWeight: 700, letterSpacing: "0.2rem" }}
                  >
                    PROFESIONALLY:
                  </span>
                  <br></br>
                  <br></br> Our team is carefully selected. In every segment of
                  the company, there are professionals with over five years of
                  experience, hundred projects behind them, and people who bring
                  their heart to every project and are maximally committed to
                  the company's development!
                </p>
              </div>
            </div>
            <button>BOOK A CALL</button>
          </div>
        </div>
      </section>
      <section className="ceo-section">
        <div className="container">
          <div className="ceo__wrapper">
            <div className="ceo__header">
              <h3>
                <span className="accent">WHO ARE WE </span>FROM THE POINT OF
                VIEW OF OUR CEO?
              </h3>
            </div>
            <div className="ceo__body">
              <div className="ceo__image">
                <img src={ceo} alt="" />
              </div>
              <div className="ceo__speech">
                <p>
                  My name is Dusan,<br></br>
                  <br></br> We call ourselves an innovative marketing agency
                  because Problem Solver is where an idea can find everything it
                  needs to experience expansion and realize its full potential!
                  <br></br>
                  <br></br>
                  We enable inspiring individuals and growing companies with
                  remarkable ideas with as much capital as they need. We allow
                  firms to boost their sales by having our trained professionals
                  sell for them on a commission basis without any cost.<br></br>{" "}
                  We implement a 3D display of their business model for
                  companies that need innovation. This detail will instantly
                  raise them above the competition and increase their sale. Of
                  course, they'll have top-quality marketing services in one
                  place!
                  <br></br>
                  <br></br> Our team is the perfect essence of passion, youth,
                  ambition, years of experience, a professional attitude and
                  expertise for each domain we cover.<br></br>
                  <br></br> We do not work for you. We work, grow and build a
                  partnership with you!
                </p>
              </div>
            </div>
            <div className="ceo__end">
              <p>
                If you are looking for innovation, creativity, and
                professionalism, go deeper into our business, and we are waiting
                for you on the call!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}

export default About;
