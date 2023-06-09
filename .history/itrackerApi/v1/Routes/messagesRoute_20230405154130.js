import { Router } from "./express";
import * as messageController from "../Controller/messagesController";

let router = Router();

router.route("/").post(messageController.getChatMessages);

router.route("/:chatId").get(messageController.createMessage);

export default router;
