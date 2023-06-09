import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		senderId: {
			type: String,
			required: [true, "senderId required"],
		},
		content: {
			type: String,
			required: [true, "message is required"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
