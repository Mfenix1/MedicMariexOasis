import connectDB from "../../middleware/mongodb";
import Hospital from "../../models/hospital";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const { name, address, telephone, cellphone } = req.body;
		if (name && address) {
			try {
				var hospital = new Hospital({
					name,
					address,
					telephone,
					cellphone,
				});

				var hospitalcreated = await hospital.save();
				return res.status(200).send(hospitalcreated);
			} catch (error) {
				return res.status(500).send(error.message);
			}
		} else {
			res.status(422).send("data_incomplete");
		}
	} else {
		res.status(422).send("req_method_not_supported");
	}
};

export default connectDB(handler);
