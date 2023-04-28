import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		senderId: {
			type: String,
		},
		content: {
			type: String,
			trim: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

messageSchema.post("create", function (next) {
	this.populate({
		path: "chat",
		select: "user chatId",
	});
	// next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
