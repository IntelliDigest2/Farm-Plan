import { catchAsync } from "../utils/utils";
import Message from "../Models/messagesModel";
import next from "next";

export function getChatMessages() {
	catchAsync(async (req, res, next) => {
		Message.find();
	});

	next();
}

export function sendChatMessage(
    
) {catchAsync(async(req,res,next){})}
