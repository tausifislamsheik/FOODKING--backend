import { Request, Response } from "express";
import { mealServices } from "./meal.service";



const createMeal = async (req: Request, res: Response) => {
  try{
   const user = req.user;
   if(!user){
      return res.status(400).json({
        error: "Unauthorized",
     })
   }
     const result = await mealServices.createMeal(req.body, user.id as string)
     res.status(201).json(result)
  }catch(err){
     res.status(400).json({
        error: "Meal creation failed",
        details: err
     })
  }
};






export const mealController = {
  createMeal,
  
};