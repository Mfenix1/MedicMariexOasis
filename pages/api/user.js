import connectDB from "../../middleware/mongodb";
import Response from "../../models/response";
import User from "../../models/user";

const handler = async (req, res) => {
	const cur = new Response({
		message: "Welcome!",
		next_messages: [],
	});
	console.log(await User.find({}).exec());
	res.send("found!");
};

export default connectDB(handler);
