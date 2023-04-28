import { Router } from "./express";
import * as messageController from "../Controller/messageController";

let router = Router();

router.route("/getUserMessage").get(messageController.getMessage);
