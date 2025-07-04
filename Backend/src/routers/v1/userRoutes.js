import express from "express";
import {userController} from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";

const router = express.Router();

router.get("/:id", auth.jwtAuth, userController.getById);
router.put("/:id", auth.jwtAuth, userController.update);
router.delete("/:id", auth.jwtAuth, userController.delete);
router.post("/:id/rate", auth.jwtAuth, userController.rateStoreOwner);
// router.post("/:id/restore", auth.jwtAuth, userController.restore); 
// router.get("/deleted/list", auth.jwtAuth, userController.getDeleted); 



export default router;
