import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatId: { type: String },
		users: { type: Array },
		userName: { type: String },
		consultantName: { type: String },

		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		eventDate: { type: String },
	},
	{
		timestamps: true,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

chatSchema.virtual("messages", {
	ref: "Message",
	localField: "_id",
	foreignField: "chat",
});

chatSchema.pre(/^find/, function (next) {
	this.populate({
		path: "latestMessage",
		select: "content",
	});
	next();
});
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
