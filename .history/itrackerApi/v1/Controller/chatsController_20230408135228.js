import Chat from "../Models/chatModel";
import { catchAsync } from "../utils/utils";

export const getUserChats = catchAsync(async (req, res, next) => {
	const userId = req.body;

	let allConsultantChats = await Chat.find({
		users: { $elemMatch: { $eq: userId } },
	})
		.populate("latestMessage")
		.sort({ updatedAt: -1 });

	res.status(200).json({
		status: "success",
		data: allConsultantChats,
	});
});

export function deleteUserChat() {}

// export function getUserChats() {}
