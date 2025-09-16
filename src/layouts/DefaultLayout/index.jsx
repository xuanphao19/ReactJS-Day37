import { Outlet } from "react-router";
import clsx from "clsx";

import styles from "./DefaultLayout.module.scss";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function DefaultLayout() {
  return (
    <>
      <Header className={clsx(styles["container"])} />
      <div className={clsx(styles["content"])}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default DefaultLayout;
