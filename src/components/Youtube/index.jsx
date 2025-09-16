// src/components/Youtube/index.jsx

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import styles from "./Youtube.module.scss";
import Modal from "../Modal";

function VideoJs({
  videoRef,
  isOpen,
  videoId = "",
  overlay = false,
  pressEscClose = false,
  closeOnOverlay = false,
  closeOnOutsideClick = false,
  onAfterOpen = () => {},
  onAfterClose = null,
  onRequestClose = null,
  optsVideo,
  className,
  timeCtrlOpen,
  timeCtrlClose,
  overlayClassName,
  contentClassName,
  isCloseInternal = false,
}) {
  const modalRef = useRef();
  const timerRef = useRef(null);
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(20);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newVideo, setNewVideo] = useState("DpvYHLUiZpc");

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const handleStopVideo = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    playerRef.current?.stopVideo();
    if (isCloseInternal && typeof onRequestClose === "function")
      onRequestClose();
  }, [onRequestClose, isCloseInternal]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (videoId) setNewVideo(videoId);
  }, [videoId]);

  useEffect(() => {
    if (!isOpen) {
      if (playerRef.current) {
        playerRef.current.pauseVideo();
        playerRef.current.stopVideo();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      if (playerRef.current) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100 || 0);
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, newVideo]);

  const opts = {
    width: "800",
    height: "450",
    playerVars: {
      rel: 0,
      controls: 1,
      autoplay: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
    ...optsVideo,
  };

  useEffect(() => {
    if (videoRef)
      videoRef.current = {
        openVideoId: (video) => {
          modalRef.current.open();
          setNewVideo(video);
        },
        play: () => playerRef.current.playVideo(),
        pause: () => playerRef.current.pauseVideo(),
        togglePlay: () => togglePlay(),
        open: () => modalRef.current.open(),
        close: () => modalRef.current.close(),
        toggleModal: () => modalRef.current.toggle(),
      };
  }, [videoRef, togglePlay]);

  useEffect(() => {
    if (volume <= 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const handleStateChange = (event) => {
    const playerStatus = event.data;
    if (playerStatus === 1) {
      setIsPlaying(true);
    } else if (playerStatus === 2 || playerStatus === 0) {
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    if (!playerRef.current) return;
    const percent = e.target.value;
    setProgress(percent);
    const seekTime = (percent / 100) * duration;
    playerRef.current.seekTo(seekTime, true);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolume = (e) => {
    if (!playerRef.current) return;
    const vol = e.target.value;

    setVolume(vol);
    playerRef.current.setVolume(vol);
  };

  return (
    <Modal
      forwardRef={modalRef}
      isOpen={isOpen}
      showOverlay={overlay}
      className={className}
      timeCtrlOpen={timeCtrlOpen}
      timeCtrlClose={timeCtrlClose}
      pressEscClose={pressEscClose}
      closeOnOverlay={closeOnOverlay}
      overlayClassName={overlayClassName}
      closeOnOutsideClick={closeOnOutsideClick}
      contentClassName={clsx(contentClassName, styles["content-video"])}
      isCloseInternal={isCloseInternal}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose || handleStopVideo}>
      {/*
       *****************
       */}
      <div className={clsx(styles.youtube)}>
        <YouTube
          videoId={newVideo}
          opts={opts}
          onReady={onReady}
          onStateChange={handleStateChange}
          className={"youtube-content"}
        />
        <div className={clsx(styles.controls)}>
          <button
            className={clsx(styles.stop, styles.ctrl)}
            onClick={handleStopVideo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
              />
            </svg>
          </button>

          <button
            className={clsx(styles.play, styles.ctrl)}
            onClick={togglePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              width="1em"
              height="1em"
              stroke="currentColor">
              {!isPlaying && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              )}
              {isPlaying && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
          </button>

          <button
            className={clsx(styles.restart, styles.ctrl)}
            onClick={() => playerRef.current?.seekTo(0, true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          <button
            className={clsx(styles.close_modal, styles.ctrl)}
            onClick={handleStopVideo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className={clsx(styles.progress)}>
          <span className={clsx(styles.current_time, styles.time_range)}>
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className={clsx(styles.range, styles.time_range)}
          />
          <span className={clsx(styles.duration, styles.time_range)}>
            {formatTime(duration)}
          </span>
        </div>

        <div className={clsx(styles.volume, styles.volume_range)}>
          <svg
            onClick={toggleMute}
            className={clsx(styles["volume-icon"])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round">
            {!isMuted ? (
              <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            ) : (
              <path
                stroke="red"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            )}
          </svg>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolume}
            className={clsx(styles.range, styles.volume_range)}
          />
          <label className={clsx(styles.volume, styles.volume_range)}>
            {`${volume}%`}
          </label>
        </div>
      </div>
    </Modal>
  );
}

export default VideoJs;
