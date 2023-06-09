import Chat from "../Models/chatModel.js";
import { catchAsync } from "../utils/utils.js";

export const getUserChats = catchAsync(async (req, res, next) => {
	const { userId } = req.body;

	let allConsultantChats = await Chat.find({
		users: { $elemMatch: { $eq: userId } },
	})
		.populate("latestMessage")
		.sort({ updatedAt: -1 });

	// console.log(
	// 	allConsultantChats,
	// 	`these are the user chats from the controller`
	// );

	res.status(200).json({
		status: "success",
		data: allConsultantChats,
	});
});

export function deleteUserChat() {}

// export function getUserChats() {}

export const createChat = catchAsync(async (req, res, next) => {
	console.log(`it came here`);
	if (!req.body.user1 || !req.body.user2) {
		return res.status(400).json({
			status: "error",
			message: "users were not specified in the request",
		});
	}
	const { user1, user2, userName, consultantName } = req.body;

	const newChat = await Chat.create({
		chatId: `${user1}_${user2}`,
		users: [user1, user2],
		isActive: true,
		consultantName: consultantName,
		userName: userName,
	});

	res.status(201).json({
		status: "success",
		data: newChat,
	});
});
