import User from "../../models/user";
import Response from "../../models/response";
import connectDB from "../../middleware/mongodb";

async function handler(req, res, next) {
	console.log("hello");
	console.log("recieved stuff!");
	console.log(req.body.inboundSMSMessageList.inboundSMSMessage);

	const messages = req.body.inboundSMSMessageList.inboundSMSMessage;

	messages.map(async (msg) => {
		let number = msg.senderAddress;
		number = number.slice(7);
		console.log(number);

		const user = await User.findOne({ number });
		console.log(user);
		let curRes = await Response.findById(user.current_message);
		if (curRes != null) {
			curRes = await curRes.nextResponse(msg.message);
		} else {
			curRes = await Response.findOne({ label: "A" });
		}

		user.current_message = curRes;
		await user.save();

		const URI = `https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8046/requests?access_token=${user.access_token}`;
		// console.log(URI);

		let data = await fetch(
			`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8046/requests?access_token=${user.access_token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					address: `0${number}`,
					message: curRes.message,
				}),
			}
		);
		data = await data.json();
		console.log(data);
	});

	res.status = 200;
	res.send("done!");

	/*
  const senderAddress = 8046;
  const access_token = '22eeea06cadefb443d42a4c4c689e326d0b5f9d11ecc2196794a79178f30200d';
  let data = await fetch(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${senderAddress}/requests?access_token=${access_token}
`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'apikey':'3b1abad53036cf6f34891e82592cfd65',
      'number':'09176740288',
      'message':'hi there!'
    })

  });
  data = await data.json();
  console.log(data);
  res.send('done!');
  */
}

export default connectDB(handler);
