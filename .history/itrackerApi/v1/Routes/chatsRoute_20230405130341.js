import { Router } from "express";
import * as userController from "../controller/chatsController.js";
const router = Router();

router.route("/").get(userController.getChats);

router.route("/").post(userController.addChat);

router.route("/").delete(userController.deleteChat);

// router.route("/").get(userController.getAllChats);
