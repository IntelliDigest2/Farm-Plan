import { Router } from "express";
import * as chatController from "../controller/chatsController.js";
const router = Router();

router.route("/").get(chatController.getChats);

router.route("/").post(chatController.addChat);

router.route("/").delete(chatController.deleteChat);

// router.route("/").get(userController.getAllChats);

export default router;
