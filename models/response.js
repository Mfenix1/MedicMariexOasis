import mongoose from "mongoose";
const Schema = mongoose.Schema;
const RegExp = require("mongoose-regexp");
//require('mongoose-regexp')(mongoose);

const response = new Schema({
	message: {
		type: String,
		required: true,
	},
	requirement: {
		type: RegExp,
		required: true,
	},
	next_messages: [
		{
			type: Schema.Types.ObjectId,
			ref: "Response",
			required: true,
		},
	],
	label: {
		type: String,
	},
});

response.methods.nextResponse = async function (res) {
	//console.log(this);
	try {
		for (let i = 0; this.next_messages.length > i; i++) {
			let msg = this.next_messages[i];
			msg = await mongoose.model("Response").findById(msg);
			//console.log(msg);
			if (res.match(msg.requirement)) {
				return msg;
			}
		}
	} catch (err) {
		console.error(err);
	}
};

mongoose.models = {};

const Response = mongoose.model("Response", response);

export default Response;
