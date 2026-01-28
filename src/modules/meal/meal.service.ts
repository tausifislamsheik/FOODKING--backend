import { prisma } from "../../lib/prisma";

interface CreateMealInput {
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable?: boolean;
  categoryId: string;
}

const createMeal = async (data: CreateMealInput, userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found.");
  }

  if (!data.categoryId) {
    throw new Error("Category is required");
  }

  return prisma.meal.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image ?? null,
      isAvailable: data.isAvailable ?? true,
      category: {
        connect: { id: data.categoryId }, 
      },

      provider: {
        connect: { id: providerProfile.id }, 
      },
    },
  });
};

export const mealServices = {
  createMeal,
};
