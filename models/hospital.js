import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hospital = new Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	telephone: {
		type: String,
		required: true,
	},
	cellphone: {
		type: String,
		required: true,
	},
});

mongoose.models = {};

const Hospital = mongoose.model("Hospital", hospital);

export default Hospital;
