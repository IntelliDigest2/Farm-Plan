import { Router } from "express";
import * as chatController from "../controller/chatsController.js";
const router = Router();

router.route("/getChats").post(chatController.getUserChats);

router.route("/newChat").post(chatController.createChat);

// router.route("/").delete(chatController.deleteChat);

// router.route("/").get(userController.getAllChats);

export default router;
