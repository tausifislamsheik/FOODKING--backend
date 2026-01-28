import { Request, Response } from "express";
import { providerServices } from "./provider.service";

const onboard = async (req: Request, res: Response) => {
  try {
    const { businessName, address, description } = req.body;

    const provider = await providerServices.onboardProvider({
      userId: req.user!.id,
      businessName,
      address,
      description,
    });

    res.status(201).json({
      message: "You are now a provider",
      provider,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const providerController = {
  onboard,
};
