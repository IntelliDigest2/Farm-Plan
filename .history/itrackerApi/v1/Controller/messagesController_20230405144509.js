import { catchAsync } from "../utils/utils";
import Message from "../Models/messagesModel";
import next from "next";

export function getChatMessages() {
	catchAsync(async (req, res, next) => {
		Message.find();
	});

	next();
}

export function sendChatMessage(req, res, next) {
	catchAsync(async (req, res, next) => {
		const { content, chatId } = req.body;
		if (!content || !chatId) {
		}

		let newMessage = {
			sender: req.user._id,
			content: content,
			chat: chatId,
		};

		Message.create(newMessage);
	});
}
