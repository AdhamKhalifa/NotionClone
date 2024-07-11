import React from "react";
import ReactMarkdown from "react-markdown";

const Block: React.FC<{
  block: any;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ block, onEdit, onDelete }) => {
  return (
    <div>
      {block.type === "text" &&
        React.createElement(block.tag, {}, block.content)}
      {block.type === "image" && (
        <img
          src={block.src}
          alt="block image"
          style={{ width: block.width, height: block.height }}
        />
      )}
      {block.type === "markdown" && (
        <ReactMarkdown>{block.content}</ReactMarkdown>
      )}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Block;
