// src/pages/Home/index.jsx

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Home.module.scss";
import VideoJs from "@/components/Youtube";
import { Link } from "react-router";

function Home() {
  const video = useRef();
  const timeClose = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [fakeTime, setFakeTime] = useState({
    time: 0,
    open: "",
    close: "",
  });

  const [state, setState] = useState({
    optsVideo: {},
    overlay: false,
    pressEscClose: false,
    closeOnOverlay: true,
    closeOnOutsideClick: false,
    onClose: null,
    isCloseInternal: false,
  });

  const openVideoEsc = (id) => {
    setState({ closeOnOutsideClick: false, pressEscClose: true });
    if (id) setVideoId(id);
    setIsOpen(true);
  };

  const openVideoOverlay = (id) => {
    setState({
      closeOnOutsideClick: false,
      overlay: true,
      closeOnOverlay: true,
    });
    if (id) setVideoId(id);
    setIsOpen(true);
  };

  const noCloseOnOverlay = (id) => {
    setState({
      overlay: true,
      closeOnOutsideClick: false,
      closeOnOverlay: false,
      pressEscClose: true,
    });
    if (id) setVideoId(id);
    setIsOpen(true);
  };

  const whenClickedOutside = (id) => {
    setState({ closeOnOutsideClick: true });
    if (id) setVideoId(id);
    setIsOpen(true);
  };

  const handleCloseInternal = (id) => {
    setState({
      overlay: true,
      closeOnOutsideClick: false,
      closeOnOverlay: false,
      isCloseInternal: true,
      pressEscClose: false,
    });
    if (id) setVideoId(id);
    setIsOpen(true);
  };

  const openWhenOnAfterOpen = (id, time = 0) => {
    setState({
      timeCtrlOpen: time,
      pressEscClose: true,
      isCloseInternal: true,
    });
    if (id) setVideoId(id);
    setIsOpen(true);
    setFakeTime({ open: "", close: "", time: time });
  };

  const handleOnAfterOpen = useCallback(() => {
    setFakeTime((prev) => {
      return {
        ...prev,
        close: "",
        open: `Modal đã được Mở hoàn toàn sau ${prev.time} ms!`,
      };
    });
    setTimeout(() => {
      setFakeTime({});
    }, fakeTime.time);
  }, [fakeTime.time]);

  const handleWhenOnAfterClose = (id, time = 0) => {
    setState((prev) => {
      return {
        ...prev,
        pressEscClose: true,
        timeCtrlClose: time,
        isCloseInternal: true,
      };
    });
    if (id) setVideoId(id);
    timeClose.current = time;
    setIsOpen(true);
  };

  const handleOnAfterClose = useCallback(() => {
    setFakeTime((prev) => {
      return {
        ...prev,
        time: timeClose.current,
        close: `Đã Đóng Modal trong vòng ${
          timeClose.current ? timeClose.current : 0
        } ms!`,
      };
    });
  }, []);

  useEffect(() => {
    if (fakeTime.close) {
      setTimeout(() => {
        timeClose.current = null;
        setFakeTime({});
      }, timeClose.current + 4000);
    }
  }, [fakeTime.close]);

  const handleRequestClose = () => {
    console.log("Đã handleRequestClose Modal!");
    setIsOpen(false);
    setVideoId(null);
    setState({});
  };

  return (
    <main className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>
        Welcome
        <span className={clsx(styles.payment)}> web dev - f8 React -</span>
        {` Day 37.`}
      </h1>
      <p className={clsx(styles.desc)}>
        {`Chinh phục ReactJS cùng F8 `}
        <a
          href="https://fullstack.edu.vn/"
          target="_blank"
          rel="noopener noreferrer">
          - fullstack.edu.vn -
        </a>
        {` Học lập trình để đi làm!`}
      </p>
      <div className="container">
        <Link
          to={
            "https://github.com/xuanphao19/F8_ReactJS-day36/blob/main/src/Routes/AppRoutes/index.jsx"
          }
          className={clsx(styles.repositories)}
          target="_blank"
          rel="noopener noreferrer">
          <span>⭐</span> Repositories GitHub
        </Link>
      </div>

      <div className={clsx(styles["video-lists"])}>
        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>
            Đóng Modal với nút Esc
          </h2>
          <p className={clsx(styles["card-desc"])}>
            Modal được đóng khi nhấn phím Esc on keyboard
          </p>
          <button onClick={() => openVideoEsc("DpvYHLUiZpc")}>Modal Esc</button>
        </div>

        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>
            Đóng Modal với Overlay
          </h2>
          <p className={clsx(styles["card-desc"])}>
            Modal có Overlay và click Overlay để đóng Modal
          </p>
          <button onClick={() => openVideoOverlay("wdClIBBqom4")}>
            Modal Overlay
          </button>
        </div>

        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>
            Không đóng on Overlay
          </h2>
          <p className={clsx(styles["card-desc"])}>
            Modal có lớp phủ Overlay nhưng click Overlay không đóng
          </p>
          <button onClick={() => noCloseOnOverlay("CNTpO-xmxv4")}>
            Modal Overlay
          </button>
        </div>

        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>
            When Clicked Outside
          </h2>
          <p className={clsx(styles["card-desc"])}>
            Modal Không có lớp phủ nhưng click Outside vẫn đóng
          </p>
          <button
            id="outsideBtn"
            onClick={() => whenClickedOutside("wfgfgS4WdjQ")}>
            Outside Clicked
          </button>
        </div>

        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>
            When Clicked Internal
          </h2>
          <p className={clsx(styles["card-desc"])}>
            Modal Hiển thị nút điều khiển Đóng từ bên trong
          </p>
          <button
            id="outsideBtn"
            onClick={() => handleCloseInternal("wdClIBBqom4")}>
            Close Internal
          </button>
        </div>

        <div className={clsx(styles.card, styles["video-card"])}>
          <h2 className={clsx(styles["card-hearding"])}>On After Open</h2>
          <p className={clsx(styles["card-desc"])}>
            Modal xử lý OnAfterOpen với thời gian giả định (fake time)
          </p>
          <button
            className="outsideBtn"
            onClick={() => openWhenOnAfterOpen("wdClIBBqom4", 1000)}>
            Fake Open
          </button>
          <button
            style={{ marginLeft: "16px" }}
            className="outsideBtn"
            onClick={() => handleWhenOnAfterClose("wdClIBBqom4", 500)}>
            Fake Close
          </button>
        </div>

        {fakeTime.time != 0 && (fakeTime.open || fakeTime.close) && (
          <div
            className={clsx({
              [styles["card-masseger-open"]]: fakeTime.open,
              [styles["card-masseger-close"]]: fakeTime.close,
            })}>
            {fakeTime.open || fakeTime.close}
          </div>
        )}
      </div>

      <VideoJs
        videoRef={video}
        isOpen={isOpen}
        videoId={videoId}
        overlay={state.overlay}
        contentClassName={clsx(styles["content-video-home"])}
        timeCtrlOpen={state.timeCtrlOpen}
        timeCtrlClose={state.timeCtrlClose}
        pressEscClose={state.pressEscClose}
        closeOnOverlay={state.closeOnOverlay}
        closeOnOutsideClick={state.closeOnOutsideClick}
        optsVideo={{}}
        onAfterOpen={handleOnAfterOpen}
        onAfterClose={handleOnAfterClose}
        onRequestClose={handleRequestClose}
        isCloseInternal={state.isCloseInternal}
      />
    </main>
  );
}

export default Home;
