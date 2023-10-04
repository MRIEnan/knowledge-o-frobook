import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

import particlesConfig from "@/components/particles/particles-config";
import React, { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { ISourceOptions } from "tsparticles-engine";

export default function LoginLayout() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Particles
          options={particlesConfig as ISourceOptions}
          init={particlesInit}
        ></Particles>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
