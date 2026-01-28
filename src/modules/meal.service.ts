import { Meal } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const createMeal = async (data: Meal, userId: string) => {
    const result = await prisma.meal.create({
        data: {
            ...data,
            providerId: userId,
        }
    })
    return result;
};




export const mealServices = {
  createMeal,
};