import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [imageSource, setImageSource] = useState(
    block?.src?.startsWith("/uploads/") ? "local" : "url"
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (block) {
      setType(block.type);
      setContent(block.content);
      setTag(block.tag);
      setSrc(block.src);
      setWidth(block.width);
      setHeight(block.height);
      setImageSource(block.src?.startsWith("/uploads/") ? "local" : "url");
    } else {
      resetFields();
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
    console.log("Saving block:", newBlock);
    onSave(newBlock);
    if (!block) {
      resetFields();
    }
  };

  const resetFields = () => {
    setType("text");
    setContent("");
    setTag("p");
    setSrc("");
    setWidth("100px");
    setHeight("100px");
    setImageSource("url");
    setFile(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded, response:", response.data);
        setSrc(response.data.url);
        console.log("Image source set to:", response.data.url);
      } catch (error) {
        console.error("Error uploading the file", error);
      }
    }
  };

  return (
    <div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="markdown">Markdown</option>
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
          <select
            value={imageSource}
            onChange={(e) => setImageSource(e.target.value)}
          >
            <option value="url">URL</option>
            <option value="local">Local</option>
          </select>
          {imageSource === "url" ? (
            <input
              type="text"
              placeholder="Image URL"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
          ) : (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}
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
      {type === "markdown" && (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}
      <button onClick={saveBlock}>Save</button>
    </div>
  );
};

export default BlockEditor;
