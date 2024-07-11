import React, { useState, useEffect } from "react";
import axios from "axios";

// BlockEditor component with props: block and onSave

const BlockEditor: React.FC<{ block?: any; onSave: (block: any) => void }> = ({
  block,
  onSave,
}) => {
  // State variables to manage the form fields
  const [type, setType] = useState(block?.type || "text");
  const [content, setContent] = useState(block?.content || "");
  const [tag, setTag] = useState(block?.tag || "p");
  const [src, setSrc] = useState(block?.src || "");
  const [width, setWidth] = useState(block?.width || "");
  const [height, setHeight] = useState(block?.height || "");
  const [imageSource, setImageSource] = useState("url");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect to update state when block prop changes
  useEffect(() => {
    if (block) {
      setType(block.type);
      setContent(block.content);
      setTag(block.tag);
      setSrc(block.src);
      setWidth(block.width);
      setHeight(block.height);
      setImageSource(
        block.src?.startsWith("http://localhost:5000/uploads/")
          ? "local"
          : "url"
      );
    }
  }, [block]);

  // Function to handle saving the block
  const saveBlock = async () => {
    // Validate form fields
    if ((type === "text" && !content) || (type === "image" && !src && !file)) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Reset error message
    setErrorMessage("");

    let updatedSrc = src;
    // Upload image file if selected
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
        updatedSrc = response.data.url;
        setSrc(updatedSrc); // Update the state
      } catch (error) {
        console.error("Error uploading the file:", error);
        return;
      }
    }
    // Create a new block object with the current state
    const newBlock = {
      id: block?.id || Date.now().toString(), // Generate ID if not present
      type,
      content,
      tag,
      src: updatedSrc,
      width,
      height,
    };
    onSave(newBlock); // Call the onSave prop with the new block
  };
  // Function to handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile); // Update file state
  };

  return (
    <div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="markdown">Markdown</option>{" "}
      </select>
      {type === "text" && (
        <div>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="p">Paragraph</option>
          </select>
          <textarea
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
            placeholder="Width (px)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            type="text"
            placeholder="Height (px)"
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={saveBlock}>Save</button>
    </div>
  );
};

export default BlockEditor;
