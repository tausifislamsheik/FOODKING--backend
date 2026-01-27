import { Meal } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const createMeal = async (data: Meal) => {
    const result = await prisma.meal.create({
        data
    })
    return result;
};




export const mealServices = {
  createMeal,
};