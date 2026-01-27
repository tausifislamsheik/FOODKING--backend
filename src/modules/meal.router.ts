import express, { Router } from "express";
import { mealController } from "./meal.controller";

const router = express.Router();

router.post("/", mealController.createMeal)

export const mealRouter: Router = router;