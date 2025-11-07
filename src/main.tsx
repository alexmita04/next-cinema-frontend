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
import AuthProvider from "@/components/auth/AuthProvider";
import UserRoute from "@/components/auth/UserRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import NotLoggedInRoute from "@/components/auth/NotLoggedInRoute";
import Checkout from "@/components/pages/Checkout";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
                <Route
                  index
                  element={<UserRoute Component={CinemasPage} />}
                ></Route>
                <Route path=":cinemaId">
                  <Route
                    index
                    element={<UserRoute Component={SpecificCinema} />}
                  ></Route>
                  <Route
                    path="auditoriums/:auditoriumId/screenings/:screeningId"
                    element={<UserRoute Component={SpecificScreening} />}
                  ></Route>
                </Route>
              </Route>

              {/* Login Page */}
              <Route
                path="login"
                element={<NotLoggedInRoute Component={Login} />}
              ></Route>

              {/* Singup Page */}
              <Route
                path="signup"
                element={<NotLoggedInRoute Component={Signup} />}
              ></Route>

              {/* Profile Page */}
              <Route
                path="profile"
                element={<UserRoute Component={UserProfile} />}
              ></Route>

              {/* Checkout Page */}
              <Route
                path="checkout"
                element={<UserRoute Component={Checkout} />}
              ></Route>

              {/* Dashboard Route */}
              <Route path="dashboard">
                <Route
                  index
                  element={<AdminRoute Component={AdminDashboard} />}
                ></Route>
                <Route path="screenings">
                  <Route
                    path="add-screening"
                    element={<AdminRoute Component={AddScreening} />}
                  ></Route>
                  <Route
                    path="edit-screening/:screeningId"
                    element={<AdminRoute Component={EditScreening} />}
                  ></Route>
                </Route>
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
