import { Router } from "express";
import * as userController from "../controller/chatsController.js";
const router = Router();

router.route("/currentChats").get(userController.getChat);
router.route("/currentChats").get(userController.addChat);
router.route("/currentChats").get(userController.deleteChat);
router.route("/currentChats").get(userController.updateChat);
