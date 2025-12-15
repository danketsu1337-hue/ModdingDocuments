import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

app.get("/file", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).send("no file name");
  }

  const path = `ModdingDocuments/${name}`;

  if (!fs.existsSync(path)) {
    return res.status(404).send("file not found");
  }

  const content = fs.readFileSync(path, "utf8");
  res.send(content);
});

app.listen(3000);
