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

messageSchema.post("save", function (next) {
	this.populate({
		path: "chat",
		select: "users chatId",
	});
	// next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
