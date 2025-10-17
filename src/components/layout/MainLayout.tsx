import { Outlet } from "react-router";
import Navbar from "@/components/partials/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="font-inter">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
