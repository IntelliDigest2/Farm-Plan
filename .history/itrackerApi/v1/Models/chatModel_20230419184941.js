import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatId: { type: String },
		users: { type: Array },
		// topic: { type: String },
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
	},
	{
		timestamps: true,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

chatSchema.pre(/^find/, function (next) {
	this.populate({
		path: "latestMessage",
		select: "content",
	});
	next();
});
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
