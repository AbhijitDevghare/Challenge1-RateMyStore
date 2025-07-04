import express from "express";
import { authController } from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";
import validateRequestBody from "../../middlewares/validateRequestBody.js";

const router = express.Router();

// registration routes
router.post(
    "/register/user", 
    validateRequestBody.checkUserRegistrationDataField,
    auth.setRole("user"), 
    authController.register
  );

router.post(
  "/register/store-owner",
   validateRequestBody.checkStoreOwnerRegistrationDataField,
   auth.setRole("storeowner"), 
   authController.register);

router.post(
  "/register/admin",
  auth.jwtAuth,
  auth.isAdminCheck,
  validateRequestBody.checkUserRegistrationDataField,
  auth.setRole("admin"), 
  authController.register
);

// login route
router.post(
  "/login/user", 
    auth.setRole("user"),
    authController.login);

router.post(
  "/login/store-owner",
   auth.setRole("storeowner"), 
   authController.login
  );

router.post(
  "/login/admin",
  auth.setRole("admin"), 
  authController.login
);

export default router;
