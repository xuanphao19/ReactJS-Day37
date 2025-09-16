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
import Profile from "@/pages/Profile";
import ModalDemo from "@/pages/ModalDemo";
import ScrollDemo from "@/pages/Home/ScrollDemo";

function AppRoutes() {
  const basename =
    import.meta.env.MODE === "production" ? "/ReactJS-Day37/" : "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path={ROOT}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="modal-demo" element={<ModalDemo />} />
            <Route path="scroll-demo" element={<ScrollDemo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
