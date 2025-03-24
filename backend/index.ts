import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello there");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
