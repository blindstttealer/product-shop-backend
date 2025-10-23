import { RoleModel } from "./auth/schemas";
import path from "path";
import express from "express";
import { User } from "./user/schema";
import userRouter from "./user/router";
import authRouter from "./auth/router";
const app = express();
const cors = require("cors");

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/auth", authRouter);

const PORT = Number(process.env.PORT) || 7000;
const HOST = process.env.HOST || "127.0.0.1";

console.log("console.log(process.env.MONGO_URI);", process.env.MONGO_URI);
console.log("HOST);", HOST);
console.log("PORT;", PORT);
const mongoose = require("mongoose");

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });

    const roles = ["user", "admin", "moderator"];

    for (const name of roles) {
      const exists = await RoleModel.findOne({ role: name });
      if (!exists) {
        await RoleModel.create({ role: name });
        console.log(`Создана роль: ${name}`);
      }
    }
    console.log("✅ Подключено к MongoDB!");
  } catch (err) {
    console.error("❌ Ошибка подключения:", err);
  }
}

start();

app.listen(PORT, HOST, function () {
  console.log(`Server listens http://${HOST}:${PORT}`);
});
