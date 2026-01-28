import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meal/meal.router";
import { providerRouter } from "./modules/provider/provider.route";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL ?? "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/providers", providerRouter);

app.use("/meals", mealRouter);

app.get("/", (_req, res) => {
  res.send("FoodKing API is running 🚀");
});

export default app;
