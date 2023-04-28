import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			default: Date.now(),
			// required: [true,'date must be specified']
		},
		senderId: {
			type: String,
			required: [true, "senderId required"],
		},
		message: {
			type: String,
			required: [true, "message is required"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
