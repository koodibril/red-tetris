import express from "express";
import path from "path";

const app = express();
app.use(express.static("public"));
const env = process.env.NODE_ENV || "development";
if (env !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
const allowCrossDomain = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: "1mb" }));

export default app;
