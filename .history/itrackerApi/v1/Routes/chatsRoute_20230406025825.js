import { Router } from "express";
import * as chatController from "../controller/chatsController.js";
const router = Router();

router.route("/:userId").get(chatController.getChats);

router.route("/:userId").post(chatController.addChat);

router.route("/:userId").delete(chatController.deleteChat);

// router.route("/").get(userController.getAllChats);

export default router;
