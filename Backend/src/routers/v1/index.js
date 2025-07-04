import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";
import AdminRoutes from "./AdminRoutes.js";
import StoreOwnerRoutes from "./StoreOwnerRoutes.js";
import RatingRoutes from "./RatingRoutes.js"

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/admins", AdminRoutes);
router.use("/store", StoreOwnerRoutes);
router.use("/rating",RatingRoutes)

export default router;
