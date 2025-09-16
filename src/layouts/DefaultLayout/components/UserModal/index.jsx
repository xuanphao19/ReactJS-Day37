import clsx from "clsx";
import { Link } from "react-router";

import Modal from "@/components/Modal";
import css from "./UserModal.module.scss";
import Theme from "@/Theme";

function UserModal({ isOpen, onClose }) {
  return (
    <Modal
      position={"absolute"}
      isOpen={isOpen}
      isCloseInternal={true}
      closeInternal={onClose}
      closeOnOutsideClick={true}
      className={clsx(css["user-modal"])}>
      <ul className={clsx(css.wrapper)} onClick={onClose}>
        <li className={clsx(css.item)}>
          <Link></Link>
        </li>
        <li className={clsx(css.item)}>
          <Theme>Theme</Theme>
        </li>
        <li className={clsx(css.item)}>
          <Link>Trang cá nhân</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Khóa học của tôi</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Viết blog</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Bài viết của tôi</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Bài viết đã lưu</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Cài đặt</Link>
        </li>
        <li className={clsx(css.item)}>
          <Link>Đăng xuất</Link>
        </li>
      </ul>
    </Modal>
  );
}

export default UserModal;
