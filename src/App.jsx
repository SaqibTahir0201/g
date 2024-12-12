import React from "react";
import Home from "./pages/Home";
import LocomotiveScroll from "locomotive-scroll";
import ParticlesComponent from "./components/TsParticles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
