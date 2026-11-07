import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve static frontend assets if accessed via this server
const staticDir = path.resolve(__dirname, "../../public");
app.use(express.static(staticDir));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.resolve(staticDir, "index.html"), (err) => {
    if (err) next();
  });
});

export default app;
