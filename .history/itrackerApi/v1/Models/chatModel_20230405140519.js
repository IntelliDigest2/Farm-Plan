import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		from: {
			type: Date,
			default: Date.now(),
			// required: [true,'date must be specified']
		},
		to: {
			type: String,
			required: [true, "senderId required"],
		},
		lastMessage: {
			type: String,
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
