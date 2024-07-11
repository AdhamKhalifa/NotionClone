import React, { useState, useEffect } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (show) {
      let words = text.split(" ");
      let index = 0;
      setDisplayText("");

      const interval = setInterval(() => {
        if (index < words.length) {
          setDisplayText((prev) => prev + words[index] + " ");
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust typing speed here

      return () => clearInterval(interval);
    }
  }, [show, text]);

  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay as React.CSSProperties}>
      <div style={styles.modal as React.CSSProperties}>
        <button
          style={styles.closeButton as React.CSSProperties}
          onClick={onClose}
        >
          ×
        </button>

        <div style={styles.content as React.CSSProperties}>{displayText}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "600px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#2e2e2e",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
  },
  content: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#000",
  },
};

export default Modal;
