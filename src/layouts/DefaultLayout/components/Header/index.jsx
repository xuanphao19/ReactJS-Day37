import clsx from "clsx";
import { useState, useCallback } from "react";

import styles from "./Header.module.scss";
import Logo from "./../Logo/index";
import SearchForm from "../SearchForm";
import UserModal from "../UserModal";
import Notification from "../Notification";
import MyCourses from "../MyCourses";
import Theme from "@/Theme";

function Header({ className }) {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpen = useCallback(
    (modal) => {
      if (activeModal === modal) return;
      setActiveModal(modal);
    },
    [activeModal],
  );

  const handleClose = useCallback(() => setActiveModal(null), []);

  const handleTogleModal = (modal) => {
    if (modal === activeModal) {
      handleClose();
    } else {
      handleOpen(modal);
    }
  };

  return (
    <header id="header" className={clsx(styles.header)}>
      <div className={clsx(styles.inner, className)}>
        <Logo size={"medium"} text={"Học Lập Trình Để Đi Làm"} />
        <div className={clsx(styles.body)}>
          <SearchForm
            isOpen={activeModal}
            onOpen={handleOpen}
            onClose={handleClose}
            className={clsx(styles["header-search"])}
          />
        </div>
        <Theme className={clsx(styles["theme-hidden"])} />
        <div className={clsx(styles.actions)}>
          <button
            onClick={() => handleTogleModal("courses")}
            className={clsx(styles["my-courses"])}>
            Khóa học của tôi
          </button>
          <MyCourses isOpen={activeModal} onClose={handleClose} />
          <div
            className={clsx(styles["action-icon"])}
            onClick={() => handleTogleModal("notify")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            <div className={clsx(styles.notify)}>2</div>
            <Notification
              isOpen={activeModal === "notify"}
              onClose={handleClose}
            />
          </div>

          <div className={clsx(styles["circle-user"])}>
            <div className={clsx(styles["avatar-rotate"])}> </div>
            <img
              className={clsx(styles.avatar)}
              src="https://files.fullstack.edu.vn/f8-prod/user_avatars/36050/628a1334d274d.jpg"
              alt="Hòa"
              onClick={() => handleTogleModal("user")}
            />
            <UserModal isOpen={activeModal === "user"} onClose={handleClose} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
