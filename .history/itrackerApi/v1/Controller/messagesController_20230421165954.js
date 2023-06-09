import { catchAsync } from "../utils/utils.js";
import Message from "../Models/messagesModel.js";
import Chat from "../Models/chatModel.js";

export const getChatMessages = catchAsync(async (req, res, next) => {
	const { chatId } = req.params;

	const messages = await Message.find({ chatId: chatId });

	res.status(200).json({
		status: 200,
		data: messages,
	});
});

export const createMessage = catchAsync(async (req, res, next) => {
	console.log("e reach here");
	const { content, chatId, userId, usersInfo } = req.body;
	if (!content || !chatId || !userId) {
	}

	let newMessage = {
		senderId: userId,
		content: content,
		chatId: chatId,
		usersInfo: usersInfo,
	};

	let message = await Message.create(newMessage);

	await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

	res.status(201).json({
		status: "success",
		data: message,
	});
});
