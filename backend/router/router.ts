import express from "express";
import totoRouter from "./todo.route";

const router = express.Router();

router.use("/todo", totoRouter);

export default router;
