import { Router } from "express";
// import { getUserChats, createChat } from "../Controller/chatsController.js";
import * as chatController from "../Controller/chatsController.js";
const router = Router();

router.route("/getChats").post(chatController.getUserChats);
// router.route("/getChats").post(getUserChats);

router.route("/newChat").post(chatController.createChat);
// router.route("/newChat").post(createChat);

// router.route("/").delete(chatController.deleteChat);

// router.route("/").get(userController.getAllChats);

export default router;
