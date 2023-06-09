import { Router } from "express";
import * as messageController from "../Controller/messagesController.js";

let router = Router();

router.route("/:userId").get(messageController.getChatMessages);

router.route("/").post(messageController.createMessage);

export default router;
