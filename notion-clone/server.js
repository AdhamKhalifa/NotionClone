const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const app = express();
const port = 5000;

// Load environment variables from .env file
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const dataFilePath = "./data.json";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
  console.log("Creating new block:", newBlock);
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
  console.log("Updating block:", id, updatedBlock);
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

app.delete("/blocks/:id", (req, res) => {
  const { id } = req.params;
  console.log("Deleting block:", id);
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    let blocks = JSON.parse(data);
    blocks = blocks.filter((block) => block.id !== id);
    fs.writeFile(dataFilePath, JSON.stringify(blocks), (err) => {
      if (err) {
        res.status(500).send("Error writing data file");
        return;
      }
      res.send({ id });
    });
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  console.log("File uploaded:", req.file);
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.send({ url: fileUrl });
});

app.post("/summarize", async (req, res) => {
  try {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Summarize the following content: ${JSON.stringify(
            req.body
          )}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const summary = completion.choices[0].message.content;
    res.send({ summary });
  } catch (error) {
    console.error("Error summarizing content:", error);
    res.status(500).send("Failed to summarize content.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
