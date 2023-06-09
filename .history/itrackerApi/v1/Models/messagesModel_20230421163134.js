import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
	usersInfo: { type: Array },
	chatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
	},
});

messageSchema.post("save", function () {
	this.populate({
		path: "chat",
		select: "users chatId",
	});
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
