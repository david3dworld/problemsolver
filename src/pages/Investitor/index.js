import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import logo from "../../images/logo.png";
import exampleIcon1 from "../../images/example-icon-1.png";
import exampleIcon2 from "../../images/example-icon-2.png";
import exampleIcon3 from "../../images/example-icon-3.png";
import exampleIcon4 from "../../images/example-icon-4.png";
import exampleIcon5 from "../../images/example-icon-5.png";
import exampleIcon6 from "../../images/example-icon-6.png";
import placeholder1 from "../../images/people-writing.png";
import placeholder2 from "../../images/man-throwing-money.png";
import process from "../../images/process.png";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "../../assets/particlesConfig";

function Investitor() {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  return (
    <motion.div
      className="investitor"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <section className="intro">
        <Particles
          className="particles-here"
          init={particlesInit}
          options={particlesConfig}
        />
        <div className="container">
          <div className="intro__wrapper">
            <div className="intro__header">
              <h1>
                INVESTITORS<span className="shadow">INVESTITORS</span>
              </h1>
              <p style={{ fontWeight: 700 }}>
                The beginning of business can start in different ways:
              </p>
            </div>
            <div className="intro__cards">
              <div className="intro__card | card-1">
                <p>WORK WITHOUT INITIAL CAPITAL</p>
              </div>
              <div className="intro__card | card-2">
                <p>
                  BORROW MONEY THAT YOU INVEST IN THE DEVELOPMENT OF YOUR
                  COMPANY
                </p>
              </div>
              <div className="intro__card | card-3">
                <p>INVEST THE WEALTH YOU HAVE ACCUMULATED OVER THE YEARS</p>
              </div>
            </div>
            <div className="intro__body">
              <p>
                These methods can also be very effective if you know your
                company's enormous potential. However, you do not have the
                entire amount of necessary capital. You are aware that without a
                certain amount, you cannot realize everything you have imagined;
                I suggest the fourth way.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <div className="cta__body">
            <p>
              Find an investor who will provide you with all the necessary funds
              and invest in your development for a small share of your business.
            </p>
          </div>
        </div>
      </section>
      <section className="logo-section">
        <div className="container">
          <div className="logo-section__body">
            <div>
              <p>
                However, finding an adequate investor to help you in your
                development is not an easy task. And what if I told you there
                was a firm that could quickly and effortlessly connect you with
                precisely the investor you want to attract?
              </p>
            </div>
            <div className="logo-section__important">
              <div>
                <img src={logo} alt="problemSolver"></img>
              </div>
              <div>
                <p style={{ fontWeight: "700" }}>
                  We are a company that supports ambitious, creative, innovative
                  entrepreneurs with a business development plan, people, and a
                  ready project. However, they lack the capital to be able to
                  implement it!<br></br>
                  <br></br> Do you need 20k, 50k, 100k million, or 100, leave it
                  to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="problems">
        <div className="container">
          <div className="problems__wrapper">
            <div className="problems__header">
              <h3>
                <span className="primary">IMPORTANCE OF INVESTORS</span> FOR THE
                COMPANY?
              </h3>
            </div>
            <div className="problems__body">
              <p>
                Suppose you are a small or medium-sized business owner and
                intend to improve your business in the coming years, accelerate
                the company's growth and enter a new and more extensive market.
                In that case, you must know the role of investors in that
                process and how important they are for those goals.<br></br>
                <br></br> Starting a business is challenging. The difference
                between you and competitors who have been on the market for more
                than ten years is enormous, and we all know that well-placed
                people with capital trample new companies and hinder their
                development.<br></br>
                <br></br>
                <span className="primary">
                  These are just some of the big problems that small and
                  medium-sized businesses that do not have investment support
                  are facing:
                </span>
              </p>
            </div>
            <div className="problems__examples">
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon1} alt="" />
                </div>
                <p>Financial instability</p>
              </div>
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon2} alt="" />
                </div>
                <p>Additional borrowings</p>
              </div>
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon3} alt="" />
                </div>
                <p>A constant struggle to get out of debt and break even</p>
              </div>
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon4} alt="" />
                </div>
                <p>Lack of license and uncertainty in work</p>
              </div>
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon5} alt="" />
                </div>
                <p>Lack of focus on business development</p>
              </div>
              <div className="example">
                <div className="example__icon">
                  <img src={exampleIcon6} alt="" />
                </div>
                <p>
                  And finding the right investor if you do it yourself is a
                  difficulty you're facing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ background: "rgba(0, 0, 0, 0.5)", paddingBlock: "2.5rem" }}
      >
        <div className="split">
          <div>
            <img src={placeholder1} alt="" />
          </div>
          <div className="split__body">
            <p>
              Would your chances be better if you had substantial start-up
              capital that would allow you to overcome the barriers in the
              initial stage of development and efficiently break through the
              first stage?<br></br>
              <br></br> Partnering with investors allows you to strengthen your
              company's financial capacity, which is especially important in the
              stages of development when you still do not have substantial
              enough capital. Investors represent excellent support for small
              and medium-sized businesses because they invest their resources
              and energy in your product, help you achieve financial stability
              and move towards greater prosperity, and free you from the
              previous debt.<br></br>
              <br></br> That's why the importance of investors for growing
              businesses is of immeasurable significance - choosing the right
              investor allows you faster, more efficient and more certain
              development and the opportunity to stand side by side with big
              businesses in a brief period.
            </p>
          </div>
        </div>
      </section>
      <section className="why-us" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="container">
          <div className="why-us__wrapper">
            <div className="why-us__header">
              <h1>
                WHY US?<span className="shadow">WHY US?</span>
              </h1>
              <p>
                Do you consider yourself an expert in your job?<br></br> Have
                you analysed your moves and the topic you are dealing with that
                you know well?<br></br> Do you know what your customers think
                and what is most vital for them to buy?<br></br> Probably yes,
                since you are focused on business development.
              </p>
            </div>
            <div className="why-us__body">
              <div className="why-us__question">
                <h4 className="accent">ONE QUESTION</h4>
                <p style={{ marginTop: "1rem" }}>
                  How much do you know about investments, the needs of
                  investors, their preferences, reasonable approach to them, and
                  the way to talk to them?
                </p>
              </div>
              <div>
                <p>
                  How long do you think it will take to find the right person
                  without this knowledge? Probably enough for the idea to be
                  reached by compet itors and for someone to overtake you.
                  <br></br>
                  <br></br>
                </p>
                <p>
                  <span className="primary" style={{ fontWeight: 700 }}>
                    Problem Solver
                  </span>{" "}
                  is a company with a network of people with capital ready to
                  invest and support promising and potential projects! So, while
                  you focus on the company's further development and innovation,
                  we will relieve you of the waste of focus and connect you with
                  the person who will help you with as much money as you want.
                  We know where, how and in what way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="process" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        {/* <div className="container"> */}
        <div className="process__wrapper">
          <div className="process__body">
            <h2>
              PROCESS <span className="shadow">PROCESS</span>
            </h2>
            <p style={{ textAlign: "justify" }}>
              <span className="primary" style={{ fontWeight: 700 }}>
                LOREM IPSUM DOLOR SIT AMET
              </span>
              <br></br>
              <br></br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit dolor
              fermentum purus pharetra ultrices. Amet eu ultrices facilisi metus
              eu nunc blandit. Pellentesque lacinia platea urna, ultrices morbi
              quam vitae eget. Ornare quam a, elit tempus eu mauris ut ac. Arcu,
              mauris sit odio egestas. Tincidunt proin at ut mollis.
            </p>
          </div>
          <div className="process__circle">
            <img src={process} alt="" />
          </div>
        </div>
        {/* </div> */}
      </section>
      <section style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="split">
          <div>
            <img src={placeholder2} alt="" />
          </div>
          <div className="split__body">
            <p style={{ fontWeight: 600 }}>
              Going into debt when you already have the opportunity to reach the
              right investor through cooperation with the Problem Solver company
              without any losses is not the wisest decision.<br></br> We will
              find adequate people ready to invest in your business. Thus you
              get the opportunity to shift the maximum focus to the development
              of the company itself and leave the care of technical matters such
              as finding the right investor to us.<br></br>
              <br></br>{" "}
              <span className="accent" style={{ fontWeight: "700" }}>
                MAKE AN APPOINTMENT
              </span>
              <br></br>
              <br></br> And start the path of development without losses!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}

export default Investitor;
