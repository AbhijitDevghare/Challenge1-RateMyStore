import express from "express";
import { authController } from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";

const router = express.Router();

router.post("/register/user", auth.setRole("user"), authController.register);

router.post("/register/store-owner", auth.setRole("storeowner"), authController.register);

router.post(
  "/register/admin",
  auth.jwtAuth,
  auth.isAdminCheck,
  auth.setRole("admin"), 
  authController.register
);

export default router;
