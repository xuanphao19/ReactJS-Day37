// src/components/Modal/index.jsx

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./Modal.module.scss";

const Modal = ({
  isRoot = true,
  forwardRef,
  isOpen: ctrlOpen,
  timeCtrlOpen = 0,
  timeCtrlClose = 0,
  position = "fixed",
  className = "",
  overlayClassName = "",
  contentClassName = "",
  bodyOpenClassName = "modal-open",
  htmlOpenClassName = "modal-open",
  showOverlay = false,
  closeOnOverlay = false,
  closeOnOutsideClick = false,
  pressEscClose = true,
  children,
  isCloseInternal,
  onAfterOpen,
  onAfterClose,
  onRequestClose,
}) => {
  const [isOpen, setIsOpen] = useState(ctrlOpen);
  const [anchor, setAnchor] = useState(false);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const isOpened = useRef(false);
  const openTimer = useRef(false);

  useEffect(() => {
    setIsOpen(ctrlOpen);
  }, [ctrlOpen]);

  // Hàm đóng modal nội tại
  const closeModal = useCallback(() => {
    if (!isOpen || !isOpened.current) return;
    // Gọi onRequestClose để thông báo parent
    if (typeof onRequestClose === "function") {
      onRequestClose();
    } else {
      setIsOpen(false);
    }

    setTimeout(() => {
      if (typeof onAfterClose === "function") {
        onAfterClose();
      }
      setAnchor(false);
      isOpened.current = false;
    }, timeCtrlClose || 0);
  }, [isOpen, onRequestClose, onAfterClose, timeCtrlClose]);

  const handleKeyDown = useCallback(
    (event) => {
      if (pressEscClose && event.key === "Escape") {
        closeModal();
      }
    },
    [pressEscClose, closeModal],
  );

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlay) {
      closeModal();
    }
  }, [closeOnOverlay, closeModal]);

  const toggle = useCallback(() => {
    if (isOpened.current) {
      closeModal();
      setIsOpen(false);
    } else if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, closeModal]);

  // Handle click ngoài Modal
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event) => {
      const modalEl = modalRef.current;
      const overlayEl = overlayRef.current;

      if (
        modalEl?.contains(event.target) ||
        event.target.closest("#header") ||
        event.target.closest("#outsideBtn")
      ) {
        return;
      }

      if (overlayEl?.contains(event.target)) {
        handleOverlayClick();
        return;
      }

      if (closeOnOutsideClick) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [
    isOpen,
    closeOnOverlay,
    closeOnOutsideClick,
    closeModal,
    handleOverlayClick,
  ]);

  // Handle Escape key
  useEffect(() => {
    if (isOpen && pressEscClose) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, pressEscClose, handleKeyDown]);

  // Handle mở Modal với callback
  useEffect(() => {
    if (isOpen && !isOpened.current) {
      document.body.classList.add(bodyOpenClassName);
      document.documentElement.classList.add(htmlOpenClassName);

      isOpened.current = true;
      setAnchor(true);
      openTimer.current = setTimeout(() => {
        if (typeof onAfterOpen === "function" && isOpen) {
          onAfterOpen();
        }
      }, timeCtrlOpen);
    }

    return () => {
      clearTimeout(openTimer.current);
      document.body.classList.remove(bodyOpenClassName);
      document.documentElement.classList.remove(htmlOpenClassName);
    };
  }, [isOpen, onAfterOpen, timeCtrlOpen, htmlOpenClassName, bodyOpenClassName]);

  useEffect(() => {
    if (forwardRef) {
      forwardRef.current = {
        open() {
          if (isOpen) setIsOpen(true);
        },
        close: () => closeModal(),
        toggle,
      };
    }
    return () => {};
  }, [forwardRef, isOpen, toggle, closeModal]);

  if (!isOpen && !anchor) return null;

  return (
    <div
      data-tippy-root={isRoot}
      className={clsx(styles["tippy-modal"], styles[position], {
        [styles.open]: isOpen,
      })}>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={clsx(
            overlayClassName,
            styles.overlay,
            styles["modal-overlay"],
            styles[`modal-overlay-${isOpen ? "open" : "closed"}`],
          )}
        />
      )}

      <div
        ref={modalRef}
        tabIndex={-1}
        className={clsx(
          styles["modal-content"],
          isOpen && styles["modal-content-open"],
          !isOpen && styles["modal-content-closed"],
          className,
        )}>
        <div className={clsx(contentClassName, styles["tippy-modal-content"])}>
          {children}
        </div>
        {isCloseInternal && (
          <button
            type="button"
            className={styles["modal-close-btn"]}
            onClick={closeModal}>
            ❌
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
