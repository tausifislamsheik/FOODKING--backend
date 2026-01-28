import { Request, Response } from "express";
import { mealServices } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const meal = await mealServices.createMeal(req.body, req.user!.id);

    return res.status(201).json({
      message: "Meal created successfully",
      data: meal,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Meal creation failed",
    });
  }
};

export const mealController = {
  createMeal,
};
