import React, { useEffect } from "react";
import styles from "./modal.module.scss"; // 스타일 분리

const Modal = ({ isOpen, onClose, onConfirm, title, children, type, size}) => {
  // ESC 키 입력 시 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
                   
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 X

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{width:size}}>
        {/* 헤더 */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
          <button className={styles.closeButton} onClick={onClose}>✖</button>
        </div>

        {/* 내용 */}
        <div className={styles.modalBox}>{children}</div>

        {/* 푸터 (버튼 영역) */}
          {type === "confirm" && (
            <div className={styles.modalFooter}>
              <button className={styles.modalFooter__close} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.modalFooter__save} onClick={onConfirm}>
                Confirm
              </button>
            </div>
          )}

          {type === "alert" && (
            <div className={styles.modalFooter}>
                <button className={styles.modalFooter__save} onClick={onClose}>
                OK
                </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Modal;
