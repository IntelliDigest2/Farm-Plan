import { catchAsync } from "../utils/utils";
import Message from "../Models/messagesModel";
import Chat from "../Chat";

export function getChatMessages() {
	catchAsync(async (req, res, next) => {
		const chatId = req.params.chatId;

		const messages = await Message.find({ chat: chatId });

		res.status(200).json({
			status: 200,
			data: messages,
		});
	});
}

export const createMessage = catchAsync(async (req, res, next) => {
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

	await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

	res.status(201).json({
		status: "success",
		data: {
			data: message,
		},
	});
});
