import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());

// ✅ Разрешаем прямой доступ ко всем файлам (статика)
app.use(express.static("."));

// Главная страница (опционально)
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome!</h1>
    <p>Browse files directly, e.g. <a href="/LuaApi/AbilityId.html">/LuaApi/AbilityId.html</a></p>
    <p>Or use <code>/file?name=filename.txt</code></p>
  `);
});

// Старый API /file — можно оставить для совместимости
app.get("/file", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).send("No file name provided");
  }

  // Защита от path traversal
  const resolved = path.resolve(name);
  const root = path.resolve(".");
  if (!resolved.startsWith(root)) {
    return res.status(403).send("Access denied");
  }

  if (!fs.existsSync(resolved)) {
    return res.status(404).send("File not found");
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(fs.readFileSync(resolved, "utf8"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
