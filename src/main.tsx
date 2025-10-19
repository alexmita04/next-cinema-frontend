import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "@/components/layout/MainLayout";
import LandingPage from "@/components/pages/LandingPage";
import ComponentsShowcase from "@/components/pages/ComponentsShowcase";
import NotFound from "@/components/pages/NotFound";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import CinemasPage from "@/components/pages/CinemasPage";
import SpecificCinema from "@/components/pages/SpecificCinema";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Landing Page */}
          <Route index element={<LandingPage />}></Route>

          {/* Components Page */}
          <Route
            path="components-showcase"
            element={<ComponentsShowcase />}
          ></Route>

          {/* Cinema Routes */}
          <Route path="cinemas">
            <Route index element={<CinemasPage />}></Route>
            <Route path=":cinemaId">
              <Route index element={<SpecificCinema />}></Route>
              <Route
                path="screenings/:screeningId"
                element={"specific-screening-page"}
              ></Route>
            </Route>
          </Route>

          {/* Login Page */}
          <Route path="login" element={<Login />}></Route>

          {/* Singup Page */}
          <Route path="signup" element={<Signup />}></Route>

          {/* Profile Page */}
          <Route path="profile" element={"user-profile"}></Route>

          {/* Stripe Page */}
          <Route path="stripe-checkout" element={"stripe-page"}></Route>

          {/* Dashboard Route */}
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

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
