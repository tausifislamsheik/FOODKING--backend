import { Router } from "express";
import { mealController } from "./meal.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router();

router.post(
  "/",
  auth(UserRole.PROVIDER),
  mealController.createMeal
);

export const mealRouter: Router = router;
