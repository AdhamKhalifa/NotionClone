import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownBlock: React.FC<{
  block: any;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ block, onEdit, onDelete }) => {
  return (
    <div>
      <ReactMarkdown>{block.content}</ReactMarkdown>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default MarkdownBlock;
