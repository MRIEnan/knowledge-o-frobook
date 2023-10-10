import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import particlesConfig from "@/components/particles/particles-config";
import { useCallback, useEffect } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { ISourceOptions } from "tsparticles-engine";
import { Toaster } from "@/components/ui/Toaster";
import { useAppSelector } from "@/redux/hooks";

export default function LoginLayout() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const navigate = useNavigate();
  const { userName } = useAppSelector((state) => state.user);
  const { revId } = useAppSelector((state) => state.review);

  const location = useLocation();
  const { path } = location.state || {};

  useEffect(() => {
    if (userName) {
      if (revId) {
        const myId = revId;
        navigate(`/book/${myId}`);
      } else if (path) {
        navigate(path);
      } else {
        navigate("/");
      }
    }
  }, [userName]);

  return (
    <div>
      <Toaster />
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
    </div>
  );
}
