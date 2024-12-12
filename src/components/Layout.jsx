import { Outlet } from "react-router-dom";
import ParticlesComponent from "./TsParticles";
function Layout() {
  return (
    <div style={{ position: "relative", height: "0vh" }}>
      <ParticlesComponent id="particles" />
      <Outlet />
    </div>
  );
}

export default Layout;
