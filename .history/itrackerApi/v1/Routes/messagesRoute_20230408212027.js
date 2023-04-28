import { Router } from "./express";
import * as messageController from "../Controller/messagesController";

let router = Router();

router.route("/:chatId").get(messageController.getChatMessages);

router.route("/:chatId").post(messageController.createMessage);

export default router;
