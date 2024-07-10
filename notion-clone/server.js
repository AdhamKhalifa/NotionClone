const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFilePath = "./data.json";

app.get("/blocks", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post("/blocks", (req, res) => {
  const newBlock = req.body;
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    const blocks = JSON.parse(data);
    blocks.push(newBlock);
    fs.writeFile(dataFilePath, JSON.stringify(blocks), (err) => {
      if (err) {
        res.status(500).send("Error writing data file");
        return;
      }
      res.send(newBlock);
    });
  });
});

app.put("/blocks/:id", (req, res) => {
  const { id } = req.params;
  const updatedBlock = req.body;
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    let blocks = JSON.parse(data);
    blocks = blocks.map((block) => (block.id === id ? updatedBlock : block));
    fs.writeFile(dataFilePath, JSON.stringify(blocks), (err) => {
      if (err) {
        res.status(500).send("Error writing data file");
        return;
      }
      res.send(updatedBlock);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
