import React from "react";
import ReactMarkdown from "react-markdown";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

// MarkdownBlock component with props: block, onEdit, onDelete
const MarkdownBlock: React.FC<{
  block: any;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ block, onEdit, onDelete }) => {
  return (
    <div className="block-container">
      <div className="block">
        <ReactMarkdown>{block.content}</ReactMarkdown>
      </div>
      <div className="block-buttons-container">
        <div className="block-buttons">
          <button onClick={onEdit} title="Edit">
            <FaEdit />
          </button>
          <button onClick={onDelete} title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownBlock;
