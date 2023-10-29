import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
	access_token: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	isSubscribed: {
		type: Boolean,
		required: true,
		default: true,
	},
	lat: {
		type: Number,
		required: false,
	},
	long: {
		type: Number,
		required: false,
	},
	current_message: {
		type: Schema.Types.ObjectId,
		ref: "Response",
		required: true,
	},
});

mongoose.models = {};

const User = mongoose.model("User", user);

export default User;
