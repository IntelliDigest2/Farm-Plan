import { catchAsync } from "../utils/utils";
import Message from "../Models/messagesModel";
import next from "next";

export function getChatMessages() {
	catchAsync(async (req, res, next) => {
		Message.find();
	});

	next();
}

export const sendChatMessage = catchAsync(async (req, res, next) => {
	const { content, chatId } = req.body;
	if (!content || !chatId) {
	}

	let newMessage = {
		sender: req.user._id,
		content: content,
		chatId: chatId,
	};

	let message = await Message.create(newMessage);

	// await message.populate;
});
