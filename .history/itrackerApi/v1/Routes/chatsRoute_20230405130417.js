import { Router } from "express";
import * as userController from "../controller/chatsController.js";
const router = Router();

router.route("/:userId").get(userController.getChats);

router.route("/:userId").post(userController.addChat);

router.route("/:userId").delete(userController.deleteChat);

// router.route("/").get(userController.getAllChats);
