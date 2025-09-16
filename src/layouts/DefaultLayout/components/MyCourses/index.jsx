import clsx from "clsx";

import Modal from "@/components/Modal";
import css from "./MyCourses.module.scss";

function MyCourses({ isOpen, onClose }) {
  return (
    <Modal
      position={"absolute"}
      showOverlay={false}
      isOpen={isOpen === "courses"}
      closeOnOutsideClick={true}
      className={clsx(css["courses-modal"])}>
      <ul className={clsx(css.wrapper)} onClick={onClose}>
        <li className={clsx(css.item, css.title)}>
          <span>Khóa học của tôi:</span>
          <span className={clsx(css.tick)}>Xem tất cả</span>
        </li>

        <li className={clsx(css.item)}>
          <div
            className={clsx(css["courses-item"])}
            style={{ ["--progress"]: "90%" }}>
            <div className={clsx(css.avatar)}>
              <img
                className={clsx(css["courses-img"])}
                src={
                  "https://files.fullstack.edu.vn/f8-prod/courses/31/67f4c93c28d4b.png"
                }
                alt="f8"
              />
            </div>

            <div className={clsx(css.courses)}>
              <div>
                <strong>Fullstack Web</strong>.
              </div>
              <div className={clsx(css["created-time"])}>
                Học cách đây 2 ngày trước
              </div>
              <div className={clsx(css.progress)}></div>
            </div>
          </div>
        </li>

        <li className={clsx(css.item)}>
          <div
            style={{ ["--progress"]: "80%" }}
            className={clsx(css["courses-item"])}>
            <div className={clsx(css.avatar)}>
              <img
                className={clsx(css["courses-img"])}
                src={
                  "https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png"
                }
                alt="f8"
              />
            </div>

            <div className={clsx(css.courses)}>
              <div>
                <strong>JavaScript Pro</strong>.
              </div>
              <div className={clsx(css["created-time"])}>
                Học cách đây 2 ngày trước
              </div>
              <div className={clsx(css.progress)}></div>
            </div>
          </div>
        </li>

        <li className={clsx(css.item)}>
          <div
            style={{ ["--progress"]: `${"30%"}` }}
            className={clsx(css["courses-item"])}>
            <div className={clsx(css.avatar)}>
              <img
                className={clsx(css["courses-img"])}
                src={"https://files.fullstack.edu.vn/f8-prod/courses/6.png"}
                alt="f8"
              />
            </div>

            <div className={clsx(css.courses)}>
              <div>
                <strong>Node & ExpressJS</strong>.
              </div>
              <div className={clsx(css["created-time"])}>
                Học cách đây 2 ngày trước
              </div>
              <div className={clsx(css.progress)}></div>
            </div>
          </div>
        </li>
      </ul>
    </Modal>
  );
}

export default MyCourses;
