import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";
import AdminRoutes from "./AdminRoutes.js";
import StoreOwnerRoutes from "./StoreOwnerRoutes.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/admins", AdminRoutes);
router.use("/store-owners", StoreOwnerRoutes);

export default router;
