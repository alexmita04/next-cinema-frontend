import { Outlet } from "react-router";
import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="font-inter min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-application">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
