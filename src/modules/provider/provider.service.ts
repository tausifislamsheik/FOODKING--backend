import { prisma } from "../../lib/prisma";

interface OnboardProviderInput {
  userId: string;
  businessName: string;
  address: string;
  description?: string;
}

const onboardProvider = async ({
  userId,
  businessName,
  address,
  description,
}: OnboardProviderInput) => {
  
  const existing = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Provider profile already exists");
  }

  
  const [provider] = await prisma.$transaction([
    prisma.providerProfile.create({
      data: {
        userId,
        businessName,
        address,
        description: description ?? null,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { role: "PROVIDER" },
    }),
  ]);

  return provider;
};

export const providerServices = {
  onboardProvider,
};
