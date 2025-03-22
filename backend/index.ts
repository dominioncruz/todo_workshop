// app.ts
import express from "express";
import { host, mongo_uri, port } from "./app.config";
import router from "./router/router";
import connectDB from "./db/connection";
import { errorHandlerMiddleware, NotFound } from "./middleware";

const app = express();

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello there!");
});

// Routes
app.use("", router);

// 404 Not Found Middleware
app.use(NotFound);


// @ts-ignore
app.use(errorHandlerMiddleware);

// Start the server
const startUpServer = async () => {
  await connectDB(mongo_uri);
  console.log("Database connection successful");
  app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
};

await startUpServer();
