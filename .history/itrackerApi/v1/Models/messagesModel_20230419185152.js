import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		senderId: {
			type: String,
			//required: [true, "senderId required"],
		},
		content: {
			type: String,
			// required: [true, "message is required"],
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

messageSchema.post("save", async function (next) {
	this.populate({
		path: "chat",
		select: "user chatId",
	});
	next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
