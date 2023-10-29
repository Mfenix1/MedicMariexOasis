import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import Response from "../../models/response";

const handler = async (req, res) => {
	let { access_token, subscriber_number } = req.query;
	console.log(access_token, subscriber_number);
	if (subscriber_number) {
		subscriber_number = subscriber_number;
		let new_user = await User.findOne({
			number: subscriber_number,
		});
		let first_message = await Response.findOne({ label: "A" });
		if (new_user === null) {
			new_user = new User({
				access_token,
				number: subscriber_number,
				isSubscribed: true,
				current_message: first_message._id,
			});
			await new_user.save();
		} else {
			new_user.isSubscribed = true;
			new_user.access_token = access_token;
			new_user.current_message = first_message._id;
			await new_user.save();
		}

		console.log(new_user.current_message);

		const curRes = await Response.findById(new_user.current_message);
		console.log(curRes);

		let data = await fetch(
			`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8046/requests?access_token=${access_token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					address: subscriber_number,
					message: curRes.message,
				}),
			}
		);
		data = await data.json();
		console.log(data);
		console.log("subscribed :)");
	} else {
		console.log(req.body);
		subscriber_number = req.body.unsubscribed.subscriber_number;
		let new_user = await User.findOne({
			number: subscriber_number,
		});
		let first_message = await Response.findOne({ label: "A" });
		if (new_user === null) {
			new_user = new User({
				access_token: "LOL",
				number: subscriber_number,
				isSubscribed: false,
				current_message: first_message._id,
			});
			await new_user.save();
		} else {
			new_user.access_token = "LOL";
			new_user.isSubscribed = false;
			await new_user.save();
		}
		console.log("unsubscribed :(");
	}
	res.send("done!");
};

export default connectDB(handler);
