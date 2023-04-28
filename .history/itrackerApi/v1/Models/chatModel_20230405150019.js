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
		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "message is required"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
