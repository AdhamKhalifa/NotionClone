import React, { useState, useEffect } from "react";

const BlockEditor: React.FC<{ block?: any; onSave: (block: any) => void }> = ({
  block,
  onSave,
}) => {
  const [type, setType] = useState(block?.type || "text");
  const [content, setContent] = useState(block?.content || "");
  const [tag, setTag] = useState(block?.tag || "p");
  const [src, setSrc] = useState(block?.src || "");
  const [width, setWidth] = useState(block?.width || "100px");
  const [height, setHeight] = useState(block?.height || "100px");

  useEffect(() => {
    if (block) {
      setType(block.type);
      setContent(block.content);
      setTag(block.tag);
      setSrc(block.src);
      setWidth(block.width);
      setHeight(block.height);
    }
  }, [block]);

  const saveBlock = () => {
    const newBlock = {
      id: block?.id || Date.now().toString(),
      type,
      content,
      tag,
      src,
      width,
      height,
    };
    onSave(newBlock);
  };

  return (
    <div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>
      {type === "text" && (
        <div>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="p">Paragraph</option>
          </select>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}
      {type === "image" && (
        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            type="text"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      )}
      <button onClick={saveBlock}>Save</button>
    </div>
  );
};

export default BlockEditor;
