import Chat from "../Models/chatModel.js";
import { catchAsync } from "../utils/utils.js";
import schedule from "node-schedule";
import { formatISO } from "date-fns";

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
	if (!req.body.user1 || !req.body.user2) {
		return res.status(400).json({
			status: "error",
			message: "users were not specified in the request",
		});
	}
	const { user1, user2, userName, consultantName, eventDate } = req.body;

	if (eventDate instanceof Date) {
		console.log("myDate is an instance of Date");
	} else {
		console.log("myDate is not an instance of Date");
	}

	const isoString = formatISO(eventDate);

	const scheduleDate = new Date(isoString);

	const asyncProcess = async () => {
		// Simulate an async process with a setTimeout
		await new Promise((resolve) => {
			setTimeout(() => {
				console.log("Async process completed.");
				resolve();
			}, 3000); // 3 seconds delay
		});
	};

	const next10Minutes = new Date(Date.now() + 10 * 60 * 1000);

	// Schedule the task using node-schedule
	const job = schedule.scheduleJob(next10Minutes, async () => {
		console.log("Task started.");

		try {
			console.log(`task has entered`);
			// Call the asyncProcess within the scheduled task
			await asyncProcess();
			console.log("Task completed.");
		} catch (error) {
			console.error("Error occurred:", error);
		}
	});

	// const newChat = await Chat.create({
	// 	chatId: `${user1}_${user2}`,
	// 	users: [user1, user2],
	// 	isActive: true,
	// 	consultantName: consultantName,
	// 	userName: userName,
	// 	eventDate: eventDate,
	// });

	res.status(201).json({
		status: "success",
		// data: newChat,
	});
});
