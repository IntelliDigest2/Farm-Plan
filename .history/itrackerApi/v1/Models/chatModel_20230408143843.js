import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatId: { type: String },
		users: { type: Array },
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		timeStamp: true,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
