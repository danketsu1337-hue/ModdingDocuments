import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

// Корневой маршрут
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome!</h1>
     <p>Use <code>/file?name=filename.txt</code> to get a file.</p>`
  );
});

// Маршрут для получения файла
app.get("/file", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).send("No file name provided");
  }

  if (!fs.existsSync(name)) {
    return res.status(404).send("File not found");
  }

  res.send(fs.readFileSync(name, "utf8"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
