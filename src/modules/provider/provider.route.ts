import { Router } from "express";
import { providerController } from "./provider.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/onboard",
  auth(UserRole.CUSTOMER),
  providerController.onboard
);


export const providerRouter: Router = router;