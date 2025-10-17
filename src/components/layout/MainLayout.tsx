import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <div className="font-inter">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
