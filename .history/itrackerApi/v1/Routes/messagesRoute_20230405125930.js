import { Router } from "./express";
import * as messageController from "../Controller/messagesController";

let router = Router();

router.route("/getMessage").get(messageController.getChatMessages);

router.route("/:chatId").post(messageController.sendChatMessage);
