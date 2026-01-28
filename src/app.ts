import express, { Application } from "express"
import { mealRouter } from "./modules/meal.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/meals", mealRouter)

app.get("/", (req, res)=>{
    res.send("Hello World");
});

export default app;