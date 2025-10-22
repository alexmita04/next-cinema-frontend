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
import SpecificScreening from "@/components/pages/SpecificScreening";
import UserProfile from "@/components/pages/UserProfile";
import AdminDashboard from "@/components/pages/AdminDashboard";
import AddScreening from "@/components/pages/AddScreening";
import EditScreening from "@/components/pages/EditScreening";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
                  element={<SpecificScreening />}
                ></Route>
              </Route>
            </Route>

            {/* Login Page */}
            <Route path="login" element={<Login />}></Route>

            {/* Singup Page */}
            <Route path="signup" element={<Signup />}></Route>

            {/* Profile Page */}
            <Route path="profile" element={<UserProfile />}></Route>

            {/* Stripe Page */}
            <Route path="stripe-checkout" element={"stripe-page"}></Route>

            {/* Dashboard Route */}
            <Route path="dashboard">
              <Route index element={<AdminDashboard />}></Route>
              <Route path="screenings">
                <Route path="add-screening" element={<AddScreening />}></Route>
                <Route
                  path="edit-screening/:screeningId"
                  element={<EditScreening />}
                ></Route>
              </Route>
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
