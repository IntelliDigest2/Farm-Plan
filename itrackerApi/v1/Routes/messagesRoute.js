import { Router } from "express";
import * as messageController from "../Controller/messagesController.js";

let router = Router();

router.route("/").post(messageController.createMessage);

router.route("/:chatId").get(messageController.getChatMessages);

export default router;
