import React from "react";

const Block: React.FC<{ block: any; onEdit: () => void }> = ({
  block,
  onEdit,
}) => {
  return (
    <div onClick={onEdit}>
      {block.type === "text" &&
        React.createElement(block.tag, {}, block.content)}
      {block.type === "image" && (
        <img
          src={block.src}
          alt="block image"
          style={{ width: block.width, height: block.height }}
        />
      )}
    </div>
  );
};

export default Block;
