import "dotenv/config";

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

import addRouter from "./routers/add";
app.use("/add", addRouter);

app.get("*", (req, res) => {
  res.send(`The ${req.path} route does not exist.`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
