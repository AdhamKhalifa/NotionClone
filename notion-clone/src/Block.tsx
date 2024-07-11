import React from "react";
import ReactMarkdown from "react-markdown";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const Block: React.FC<{
  block: any;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ block, onEdit, onDelete }) => {
  return (
    <div className="block-container">
      <div className="block">
        {block.type === "text" &&
          React.createElement(block.tag, {}, block.content)}
        {block.type === "image" && (
          <img
            src={block.src}
            alt="block"
            style={{
              width: block.width,
              height: block.height,
              maxWidth: "100%",
              borderRadius: "5px",
            }}
          />
        )}
        {block.type === "markdown" && (
          <ReactMarkdown>{block.content}</ReactMarkdown>
        )}
      </div>
      <div className="block-buttons-container">
        <div className="block-buttons">
          <button
            onClick={onEdit}
            title="Edit"
            style={{
              background: "none",
              border: "none",
              color: "#E0E0E0",
              cursor: "pointer",
              padding: "5px",
              margin: "2px 0",
            }}
          >
            <FaEdit />
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            style={{
              background: "none",
              border: "none",
              color: "#E0E0E0",
              cursor: "pointer",
              padding: "5px",
              margin: "2px 0",
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Block;
