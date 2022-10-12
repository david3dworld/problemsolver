import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Marketing from "../pages/Tradinional Marketing";
import About from "../pages/About";
import Investitor from "../pages/Investitor";
import Error from "../pages/Error";
import { AnimatePresence } from "framer-motion";
import Fix from "../pages/Fix";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/investitor" element={<Investitor />} />
        <Route path="/about" element={<About />} />
        <Route path="/fix" element={<Fix />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
