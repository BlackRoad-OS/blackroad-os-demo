import express from "express";
import path from "path";
import health from "./routes/health";

const app = express();

app.use(health);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

const port = Number(process.env.PORT) || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`[blackroad-os-demo] listening on http://0.0.0.0:${port}`);
});
