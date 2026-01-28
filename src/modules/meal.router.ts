import express, { NextFunction, Request, Response, Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../middleware/auth";

const router = express.Router();



router.post("/",auth(UserRole.Provider), mealController.createMeal);

export const mealRouter: Router = router;
