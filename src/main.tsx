import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import MainLayout from "@/components/layout/MainLayout";
import LandingPage from "@/components/pages/LandingPage";
import ComponentsShowcase from "@/components/pages/ComponentsShowcase";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />}></Route>

          <Route
            path="components-showcase"
            element={<ComponentsShowcase />}
          ></Route>

          <Route path="cinemas">
            <Route index element={"cinemas-page"}></Route>
            <Route path=":cinemaId">
              <Route index element={"specific-cinema-page"}></Route>
              <Route
                path="screenings/:screeningId"
                element={"specific-screening-page"}
              ></Route>
            </Route>
          </Route>

          <Route path="login" element={"login"}></Route>

          <Route path="signup" element={"signup"}></Route>

          <Route path="profile" element={"user-profile"}></Route>

          <Route path="stripe-checkout" element={"stripe-page"}></Route>

          <Route path="dashboard">
            <Route index element={"adin-dashboard"}></Route>
            <Route path="screenings">
              <Route path="add-screening" element={"add-screening"}></Route>
              <Route
                path="edit-screening/:screeningId"
                element={"edit-screening"}
              ></Route>
            </Route>
            <Route path="movies">
              <Route path="add-movie" element={"add-movie"}></Route>
              <Route path="edit-movie/:movieId" element={"edit-movie"}></Route>
            </Route>
          </Route>

          <Route path="*" element={"Not Found"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
