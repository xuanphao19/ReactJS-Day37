import clsx from "clsx";

import f8 from "@/assets/images/f8_icon.png";
import Modal from "@/components/Modal";
import css from "./Notification.module.scss";

function Notification({ isOpen, onClose }) {
  return (
    <Modal
      position={"absolute"}
      isOpen={isOpen}
      closeInternal={onClose}
      closeOnOutsideClick={true}
      className={clsx(css["user-modal"])}>
      <ul className={clsx(css.wrapper)} onClick={onClose}>
        <li className={clsx(css.item, css.title)}>
          <span>Thông báo</span>
          <span className={clsx(css.tick)}>Đánh dấu đã đọc</span>
        </li>

        <li className={clsx(css.item)}>
          <div className={clsx(css["notify-item"])}>
            <div className={clsx(css.avatar)}>
              <img className={clsx(css["avatar-img"])} src={f8} alt="f8" />
            </div>

            <div className={clsx(css.message)}>
              <div>
                Bài học <strong>Tóm tắt chương</strong> mới được thêm vào.
              </div>
              <div className={clsx(css["created-time"])}>8 giờ trước</div>
            </div>
          </div>
        </li>

        <li className={clsx(css.item)}>
          <div className={clsx(css["notify-item"])}>
            <div className={clsx(css.avatar)}>
              <img className={clsx(css["avatar-img"])} src={f8} alt="f8" />
            </div>

            <div className={clsx(css.message)}>
              <div>
                Bài học <strong>Tóm tắt chương</strong> mới được thêm vào.
              </div>
              <div className={clsx(css["created-time"])}>8 giờ trước</div>
            </div>
          </div>
        </li>

        <li className={clsx(css.item)}>
          <div className={clsx(css["notify-item"])}>
            <div className={clsx(css.avatar)}>
              <img className={clsx(css["avatar-img"])} src={f8} alt="f8" />
            </div>

            <div className={clsx(css.message)}>
              <div>
                Bài học <strong>Tóm tắt chương</strong> mới được thêm vào.
              </div>
              <div className={clsx(css["created-time"])}>8 giờ trước</div>
            </div>
          </div>
        </li>

        <li className={clsx(css.item)}>
          <div className={clsx(css["notify-item"])}>
            <div className={clsx(css.avatar)}>
              <img className={clsx(css["avatar-img"])} src={f8} alt="f8" />
            </div>

            <div className={clsx(css.message)}>
              <div>
                Bài học <strong>Tóm tắt chương</strong> mới được thêm vào.
              </div>
              <div className={clsx(css["created-time"])}>8 giờ trước</div>
            </div>
          </div>
        </li>
      </ul>
    </Modal>
  );
}

export default Notification;
