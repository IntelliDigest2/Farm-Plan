import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		users: [String],
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
