import express from "express";
import {storeOwnerController} from "../../controllers/index.js";
import auth from "../../middlewares/Auth.js";

const router = express.Router();

router.get("/", auth.jwtAuth, auth.setRole("storeowner"), storeOwnerController.getAll);
router.get("/:id", auth.jwtAuth, storeOwnerController.getById);
router.put("/:id", auth.jwtAuth, storeOwnerController.update);
router.delete("/:id", auth.jwtAuth, storeOwnerController.delete);
router.get("/:id/ratings", auth.jwtAuth, storeOwnerController.getRatings);
// router.post("/:id/restore", auth.jwtAuth, storeOwnerController.restore);
// router.get("/deleted/list", auth.jwtAuth, storeOwnerController.getDeleted);

export default router;
