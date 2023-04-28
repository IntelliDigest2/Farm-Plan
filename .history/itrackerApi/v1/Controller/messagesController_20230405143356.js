import { catchAsync } from "../utils/utils";
import Message from "../Models/messagesModel";
import next from "next";

export function getChats() {
	catchAsync(async (req, res, next) => {
		Message.find();
	});

	next();
}

export function deleteChat() {}
export function addChat() {}
