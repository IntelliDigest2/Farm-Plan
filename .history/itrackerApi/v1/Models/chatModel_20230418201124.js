import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatId: { type: String },
		users: { type: Array },
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

const Chat = mongoose.model("Chat", chatSchema);

chatSchema.pre(/^find/, function (next) {
	this.populate({
		path: "latestMessage",
		select: "content",
	});
	next();
});

export default Chat;
