import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
// import About from "../About";
import Model from "../../components/Model";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "../../assets/particlesConfig";
// import logo from "../../images/logo.png";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Home() {
  const handleScroll = (event) => {
    console.log("pls");
    console.log("scrollTop: ", event);
  };
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleScroll(e));
    return () => {
      window.removeEventListener("scroll", (e) => handleScroll(e));
    };
  }, []);

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  return (
    <>
      <motion.div
        className="home"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <Particles
          className="particles-here"
          init={particlesInit}
          options={particlesConfig}
        />

        <ul className="home__menu">
          <div className="center">
            <div className="wrap-model">
              <div className="background"></div>
            </div>
            <Canvas>
              <directionalLight position={[-2, -5, 7.5]} />
              <Suspense fallback={null}>
                <Model />
              </Suspense>
            </Canvas>
          </div>
          <li className="deg225">
            <Link to="/marketing">TRADITIONAL MARKETING</Link>
          </li>
          <li className="deg315">
            <Link to="/investitor">INVESTITOR</Link>
          </li>
          <li className="deg180">
            <Link to="/fix">3D WORLD</Link>
          </li>
          <li className="deg10">
            <Link to="/fix">HIRE SALES PERSON</Link>
          </li>
          <li className="deg90">
            {/* <a href="#about">ABOUT US</a> */}
            <Link to="/about">ABOUT US</Link>
          </li>
        </ul>
      </motion.div>
      {/* <About /> */}
    </>
  );
}

export default Home;
