import Chat from "../Models/chatModel";
import { catchAsync } from "../utils/utils";

export const getUserChats = catchAsync(async (req, res, next) => {
	const userId = req.params.userId;

	await Chat.find({});
});

export function deleteUserChat() {}

// export function getUserChats() {}
