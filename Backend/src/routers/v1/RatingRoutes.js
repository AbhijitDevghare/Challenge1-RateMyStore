import express from "express";
import {adminController,storeOwnerController,userController,ratingController} from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";

const router = express.Router();


router.post("/rate/:storeOwnerId",auth.jwtAuth,storeOwnerController.addRatings)
router.get("/user",auth.jwtAuth,ratingController.getRatingByUserId)

export default router;

