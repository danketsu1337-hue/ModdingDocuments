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

  if (!fs.existsSync(name)) {
    return res.status(404).send("file not found");
  }

  res.send(fs.readFileSync(name, "utf8"));
});

app.listen(3000);
