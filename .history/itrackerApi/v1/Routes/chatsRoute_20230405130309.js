import { Router } from "express";
import * as userController from "../controller/chatsController.js";
const router = Router();

router.route("/currentChats").get(userController.getChats);

router.route("/").post(userController.addChat);

router.route("/").delete(userController.deleteChat);

router.route("/currentChats").patch(userController.updateChat);

// router.route("/").get(userController.getAllChats);
