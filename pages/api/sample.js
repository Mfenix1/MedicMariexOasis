import connectDB from "../../middleware/mongodb";
import Hospital from "../../models/hospital";

async function handler(req, res) {
	const hospital = new Hospital({
		name: "Hospital",
		address: "Address",
		telephone: "123-456-7890",
		cellphone: "09123456789",
	});
	await hospital.save();
	res.send("done!");
}

export default connectDB(handler);
