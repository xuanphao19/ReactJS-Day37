// src/Routes/AppRoutes/index.jsx

import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES } from "@/config/routes.prefix.js";
const {
  ROOT,
  ABOUT,
  POSTS,
  CONTACT,
  PRIVACY,
  LOGIN,
  REGISTER,
  FORGOTPASSWORD,
  DASHBOARD,
  USERS,
  SETTINGS,
  DETAIL,
  PAGES_ID,
  NOTFOUND,
} = ROUTES;

import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";

function AppRoutes() {
  const basename =
    import.meta.env.MODE === "production" ? "/F8_ReactJS-day36/" : "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path={ROOT}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
