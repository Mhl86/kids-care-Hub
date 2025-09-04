import { Outlet } from "react-router";
import Navbar from "../components/Navbar-tem.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content grows to push footer down */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
