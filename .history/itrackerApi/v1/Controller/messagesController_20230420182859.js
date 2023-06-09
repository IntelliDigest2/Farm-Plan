import { catchAsync } from "../utils/utils.js";
import Message from "../Models/messagesModel.js";
import Chat from "../Models/chatModel.js";

export const getChatMessages = catchAsync(async (req, res, next) => {
	const { chatId } = req.params;

	const messages = await Message.find({ chatId: chatId });
	console.log(messages), `these are the messages`;

	res.status(200).json({
		status: 200,
		data: messages,
	});
});

export const createMessage = catchAsync(async (req, res, next) => {
	const { content, chatId, userId, usersInfo } = req.body;
	if (!content || !chatId || !userId) {
	}
	console.log(content, "content");
	console.log(chatId, "chatId");
	console.log(userId, "userId");
	console.log(usersInfo, "usersInfo");
	// let chatIds = usersIds.split("_");

	let newMessage = {
		senderId: userId,
		content: content,
		chatId: chatId,
		usersInfo: usersInfo,
	};

	console.log(newMessage);

	// let message = await Message.create(newMessage);

	// await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

	// res.status(201).json({
	// 	status: "success",
	// 	data: message,
	// });
});
