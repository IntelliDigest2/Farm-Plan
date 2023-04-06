import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		fromUserId: {
			type: String,

			required: [true, "date must be specified"],
		},
		toUserId: {
			type: String,
			required: [true, "senderId required"],
		},
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "message is required"],
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
