import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import "dotenv/config.js";
import foodRouter from "./routers/foodRouter.js";
import userRouter from "./routers/userRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
