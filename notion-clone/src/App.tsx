import React, { useState, useEffect } from "react";
import axios from "axios";
import Block from "./Block";
import BlockEditor from "./BlockEditor";

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
      });
  };

  return (
    <div>
      <h1>Notion Clone</h1>
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onEdit={() => setEditingBlock(block)}
        />
      ))}
      <BlockEditor onSave={addBlock} />
      {editingBlock && (
        <BlockEditor block={editingBlock} onSave={updateBlock} />
      )}
    </div>
  );
};

export default App;
