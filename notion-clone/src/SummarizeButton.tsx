import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Modal from "./Modal";

const SummarizeButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [summaryText, setSummaryText] = useState("");

  const handleSummarize = async () => {
    try {
      // Fetch data from data.json
      const response = await axios.get("http://localhost:5000/blocks");
      const data = response.data;

      // Send the data to the backend to summarize
      const summaryResponse = await axios.post(
        "http://localhost:5000/summarize",
        data
      );

      const summary = summaryResponse.data.summary;
      setSummaryText(summary);
      setShowModal(true);
    } catch (error) {
      console.error("Error summarizing content:", error);
      alert("Failed to summarize content.");
    }
  };

  return (
    <>
      <button
        onClick={handleSummarize}
        title="Summarize using AI"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#2e2e2e",
          border: "none",
          borderRadius: "10%",
          width: "140px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaStar style={{ color: "#fff", fontSize: "24px" }} />
        AI Summary
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        text={summaryText}
      />
    </>
  );
};

export default SummarizeButton;
