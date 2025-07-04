import express from "express";
import {adminController,userController} from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";

const router = express.Router();

router.get("/", auth.jwtAuth, auth.isAdminCheck, adminController.getAll);
router.get("/:id", auth.jwtAuth, auth.isAdminCheck, adminController.getById);
router.put("/:id", auth.jwtAuth, auth.isAdminCheck, adminController.update);
router.delete("/:id", auth.jwtAuth, auth.isAdminCheck, adminController.delete);
// router.post("/:id/restore", auth.jwtAuth, auth.isAdminCheck, adminController.restore);
// router.get("/deleted/list", auth.jwtAuth, auth.isAdminCheck, adminController.getDeleted);


// user level operations by admin
router.get("/", auth.jwtAuth,auth.isAdminCheck, userController.getAll);

export default router;
