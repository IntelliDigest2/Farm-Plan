import { catchAsync } from "../utils/utils.js";
import Message from "../Models/messagesModel.js";
import Chat from "../Models/chatModel.js";

export function getChatMessages() {
	catchAsync(async (req, res, next) => {
		const chatId = req.params.chatId;

		const messages = await Message.find({ chat: chatId });
		// const messages = await Message.findById(chatId);

		res.status(200).json({
			status: 200,
			data: messages,
		});
	});
}

export const createMessage = catchAsync(async (req, res, next) => {
	const { content, chatId, userId } = req.body;
	if (!content || !chatId || !userId) {
	}
	console.log(content, chatId);

	let newMessage = {
		sender: userId,
		content: content,
		chatId: chatId,
	};

	console.log(newMessage);

	let message = await Message.create(newMessage);

	await message.populate;

	await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

	res.status(201).json({
		status: "success",
		data: {
			data: message,
		},
	});
});
