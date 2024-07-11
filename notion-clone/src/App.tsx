import React, { useState, useEffect } from "react";
import axios from "axios";
import Block from "./Block";
import BlockEditor from "./BlockEditor";
import MarkdownBlock from "./MarkdownBlock";

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [editingBlock, setEditingBlock] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/blocks").then((response) => {
      setBlocks(response.data);
    });
  }, []);

  const addBlock = (block: any) => {
    axios.post("http://localhost:5000/blocks", block).then((response) => {
      console.log("Block added:", response.data);
      setBlocks([...blocks, response.data]);
    });
  };

  const updateBlock = (updatedBlock: any) => {
    axios
      .put(`http://localhost:5000/blocks/${updatedBlock.id}`, updatedBlock)
      .then(() => {
        setBlocks(
          blocks.map((block) =>
            block.id === updatedBlock.id ? updatedBlock : block
          )
        );
        setEditingBlock(null);
      });
  };

  const deleteBlock = (id: string) => {
    axios.delete(`http://localhost:5000/blocks/${id}`).then(() => {
      setBlocks(blocks.filter((block) => block.id !== id));
    });
  };

  return (
    <div>
      <h1>Notion Clone</h1>
      {blocks.map((block) => {
        if (block.type === "text" || block.type === "image") {
          return (
            <Block
              key={block.id}
              block={block}
              onEdit={() => setEditingBlock(block)}
              onDelete={() => deleteBlock(block.id)}
            />
          );
        } else if (block.type === "markdown") {
          return (
            <MarkdownBlock
              key={block.id}
              block={block}
              onEdit={() => setEditingBlock(block)}
              onDelete={() => deleteBlock(block.id)}
            />
          );
        } else {
          return null;
        }
      })}
      {!editingBlock && <BlockEditor onSave={addBlock} />}
      {editingBlock && (
        <BlockEditor block={editingBlock} onSave={updateBlock} />
      )}
    </div>
  );
};

export default App;
