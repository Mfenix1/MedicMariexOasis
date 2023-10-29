import Response from "../../models/response";
import User from "../../models/user";
import connectDB from "../../middleware/mongodb";

const responses = [
	{
		message: `Magandang araw! Ako si Medic Marie. Paano kita matutulungan?

1 - Humanap ng doktor.

2 - Magbigay ng pangkalusugang payo.

3 - Alamin ang kailangang gamot at pinakamalapit na botika.

4 - Magbigay ng listahan ng mga botika na malapit sa inyo na may mga gamot.

5 - Maghanap ng tulong na medikal na kagipitan 

Pumili ng isa at i-text ang numero nito.`,

		requirement: /[\s\S]*/,
		next_messages: ["B", "C", "D", "P", "T", "F"],
		label: "A",
	},
	{
		message: `Ano ang karamdaman ng pasyente?

1 - Ubo
2 - Sipon
3 - Lagnat/pananakit ng ulo`,
		requirement: /2/,
		next_messages: ["H", "I", "J", "F"],
		label: "B",
	},
	{
		message: `Pwede po ba namin kunin ang iyong lokasyon? (OO o HINDI)`,
		requirement: /1/,
		next_messages: ["E", "F"],
		label: "C",
	},
	{
		message: `Pwede po ba namin kunin ang iyong lokasyon? (OO o HINDI)`,
		requirement: /3/,
		next_messages: ["L", "F"],
		label: "D",
	},
	{
		message: `Anong ang nais ipakonsulta ng pasyente?

1.) Pisikal na kalusugan ng katawan
2.) Kalusugang pangkaisipan
3.) Pangkalahatang kalusugan`,
		requirement: /OO/i,
		next_messages: ["G", "F"],
		label: "E",
	},
	{
		message: `Salamat sa paggamit ng chatbot namin!

Kung may iba pa kayong katanungan magtext lang ng ULIT sa number na ito.`,
		requirement: /[\s\S]*/,
		next_messages: ["A"],
		label: "F",
	},
	{
		message: `Ito ang mga doktor na malapit sa inyo.

Cristy Mae Marquez
Metro Iloilo Hospital and Medical Center, Inc.
Metropolis Ave, Jaro, Iloilo City
+63 909 536 3178


Robert Andre Villanueva
St. Vincent General Hospital
210 Jones Ave, Cebu City
+63 926 781 0923

Anton Yumol
Maranaw Medical Clinic and Hospital
Gomisa Ave, Dilod Nadoya, Marawi City
+63 933 242 1138

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		requirement: /[1-5]/,
		label: "G",
		next_messages: ["A"],
	},
	// Ubo
	{
		message: `Ito ang mga hakbang na maaari mong gawin upang mapadali ang paggamot at maiwasan ang paglala ng iyong karamdaman:

1. Uminom ng salabat o iba pang tsaa upang mabawasan ang kati ng lalamunan.
2. Magmumog ng maligamgam na tubig na may kaunting asin.
3. Kumain ng espesyal na kendi para sa lalamunan.
4. Siguraduhing naka-reseta ang iniinom na gamot.
5. Umiwas sa maalikabok na lugar, balahibo ng hayop, at iba pang bagay na maaaring magpalala ng sintomas.

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		requirement: /1/,
		label: "H",
		next_messages: ["A"],
	},
	// Sipon
	{
		message: `Ito ang mga hakbang na maaari mong gawin upang mapadali ang paggamot at maiwasan ang paglala ng iyong karamdaman:

1. Uminom nang maraming tubig. Nakatutulong ito sa pagdaloy ng sipon nang mas madali.
2. Madalas na maghugas ng kamay.
3. Magpahinga at matulog nang maigi.

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		requirement: /2/,
		label: "I",
		next_messages: ["A"],
	},
	// Lagnat/Pananakit ng ulo
	{
		message: `Ito ang mga hakbang na maaari mong gawin upang mapadali ang paggamot at maiwasan ang paglala ng iyong karamdaman:

1. Magpahinga sa kama. Nakakatulong ito sa paggaling ng katawan.

2. Uminom ng tubig. Nakakatulong ito sa paggaling ng katawan habang bumababa ang temperatura.

3. Maligo sa maaligamgam na tubig. Nakakatulong ito sa pagbaba ng temperatura ng katawan. 

4. Regular na pagkuha ng temperatura. Importante ito upang malaman kung ang temperatura ng katawan ay umaangat or bumababa. 

5. Kapag ang temperatura ay umaangat, inirerekomenda na pumunta sa isang doktor.

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		requirement: /3/,
		label: "J",
		next_messages: ["A"],
	},
	// Matinding kirot sa katawan
	{
		message: `Ang mga ito ay nakatutulong sa paggamot ng pangingirot ng katawan. Nakalista rito ang mga generic na pangalan ng gamot at ang mga may tatak na bersyon nito:

Paracetamol - Biogesic, Tempra Forte, Calpol, Opigesic, at Sanmol. 

Ibuprofen - Ang mga sumusunod na tatak ng Ibuprofen ay maaari mong bilhin sa botika: Advil, Dolan FP, Faspic, FeverFree, Medbufen, Medicol Advance/Medicol Advance 400, at Midol. Ang mga ito ay madalas ginagamit para sa pananakit ng katawan kapag may regla (menstrual pain), pananakit ng ulo (migraines), at pananakit ng mga kasukasuan (arthritis).

Naproxen - Ang mga sumusunod na tatak ng Naproxen ay maaari mong bilhin sa botika: Flanax/Flanax Forter, Syproxen, Skelan, at Sarimax.  Ang mga ito ay madalas na ginagamit para sa pananakit ng katawan kapag may regla (menstrual pain), gota (gout), at lagnat (fever).

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!`,
		requirement: /1/,
		label: "K",
		next_messages: ["A"],
	},

	{
		message: `Para sa anong sakit and gamot na kailangan ng pasyente?

1 - Matinding kirot sa isang bahagi ng katawan
2 - Lagnat/Pananakit ng ulo
3 - Sipon
4 - Ubo`,

		//Lagnat/Pananakit ng ulo
		requirement: /OO/i,
		next_messages: ["K", "M", "N", "O", "F"],
		label: "L",
	},
	{
		message: `
Ang mga ito ay nakatutulong sa paggamot ng mild hanggang katamtamang pananakit ng ulo. Kung bata ang may sakit, siguraduhing ang iinuming gamot ay pambata, at huwag itong paiinumin nang higit pa sa limang araw. Para matatanda naman, huwag ito iinumin nang higit pa sa sampung araw:

Paracetamol - Ang mga sumusunod na tatak ng paracetamol ay maaari mong bilhin sa botika: Biogesic, Tempra Forte, Calpol, Opigesic, at Sanmol. 

Ibuprofen - Ang mga sumusunod na tatak ng Ibuprofen ay maaari mong bilhin sa botika: Advil, Dolan FP, Faspic, FeverFree, Medbufen, Medicol Advance/Medicol Advance 400, at Midol. Ang mga ito ay madalas ginagamit para sa pananakit ng katawan kapag may regla (menstrual pain), pananakit ng ulo (migraines), at pananakit ng mga kasukasuan (arthritis).

Naproxen - Ang mga sumusunod na tatak ng Naproxen ay maaari mong bilhin sa botika: Flanax/Flanax Forter, Syproxen, Skelan, at Sarimax.  Ang mga ito ay madalas na ginagamit para sa pananakit ng katawan kapag may regla (menstrual pain), gota (gout), at lagnat (fever).

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "M",
		requirement: /2/,
	},
	// sipon
	{
		message: `Ang mga ito ay antihistamine na nakatutulong para sa sipon. Alalahin na ang mga ito ay maaaring magpaantok sa pasyente. Nakalista rito ang mga generic na pangalan ng gamot at ang mga may tatak na bersyon nito:

Diphenhydramine - Benadryl, Genahist, Naramin, Sominex, Unisom

Chlorpheniramine - Ritemed Chlorpheniramine Maleate, Histapen, at Antamin

Kung kailangan ng hindi nakaaantok na alternatibo, maaaring uminom na lamang ng loratadine ngunit hindi ito kasing epektibo ng mga nakasaad sa taas. Ang mga tatak ng loratadine na maaaring bilhin ay Allerta Tablet, Allisin, Claritin/Claritin Reditabs, Lorange, Loratyne, at RiteMED Loratadine.

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "N",
		requirement: /3/,
	},
	// ubo
	{
		message: `
Ang mga ito ay nakatutulong sa paggamot ng ubo. Nakalista rito ang mga generic na pangalan ng gamot at ang mga may tatak na bersyon nito:

Dextromethorphan - Dexof, Flemonex-DXM, Lafayette Dextromethorphan, Mytusan DM, Streptuss

Guaifenesin - Robitussin, Benadryl EXP, Guaiflem, Mucobron D, at Ventolin Expectorant

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "O",
		requirement: /4/,
	},
	{
		message: `
Anong gamot ang hinahanap mo?

1 - Paracetamol
  - Pantanggal ng sakit
  - Lagnat
2 - Biogesic
  - Lagnat
  - Sakit sa Ulo
  - Trangkaso
3 - Diatabs
  - Para sa sakit ng tiyan
  - LBM
`,
		next_messages: ["Q", "R", "S", "F"],
		label: "P",
		requirement: /4/,
	},
	{
		message: `
Paracetamol

ORION DRUG STORE
  - 23 Magsaysay Street, Don Francisco, Butuan
  - 09178884444

Mercury Drug Store
  - 35 Laurel Street, Bugsukan, Butuan
  - 09174448888

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "Q",
		requirement: /1/,
	},
	{
		message: `
Biogesic

ORION DRUG STORE
  - 23 Magsaysay Street, Don Francisco, Butuan
  - 09178884444

Mercury Drug Store
  - 35 Laurel Street, Bugsukan, Butuan
  - 09174448888

Anticala Medical Center
  - 12 Pinaalam Sreet, Anticala, Butuan
  - 09998881111

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "R",
		requirement: /2/,
	},
	{
		message: `
Diatabs

Mercury Drug Store
  - 35 Laurel Street, Bugsukan, Butuan
  - 09174448888

Anticala Medical Center
  - 12 Pinaalam Sreet, Anticala, Butuan
  - 09998881111

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "S",
		requirement: /3/,
	},

	{
		message: `
Ang kailangan icontact na malapit sa inyo ay:
  - Anticala Medical Center  
  - 12 Pinaalam Sreet, Anticala, Butuan
  - 09998881111

Kung may iba pang katanungan, i-text ang "ULIT" sa number na ito. Si Medic Marie ay handang tumulong!
`,
		next_messages: ["A"],
		label: "T",
		requirement: /5/,
	},
];

const addMessages = async (req, res) => {
	try {
		const docs = responses.map(async (val) => {
			const copy = {
				message: val.message,
				requirement: val.requirement,
				next_messages: [],
				label: val.label,
			};
			let doc = await Response.findOne({ label: val.label });
			if (doc === null) {
				doc = new Response(copy);
				await doc.save();
			}
			return doc;
		});
		await Promise.all(docs);
		await Promise.all(
			responses.map(async (val, idx) => {
				try {
					let next_messages = val.next_messages;
					next_messages = await Promise.all(
						next_messages.map(async (label) => {
							let doc = await Response.findOne({ label: label });
							if (doc === null) {
								throw new Error("invalid label");
							}
							return doc._id;
						})
					);
					docs[idx] = await docs[idx];
					const cur = await Response.findById(docs[idx]._id).exec();
					//console.log(cur);
					cur.next_messages = next_messages;
					await cur.save();
				} catch (err) {
					console.error(err);
				}
			})
		);
		//console.log(await Response.find({}));
		res.send("done!");
	} catch (err) {
		console.error(err);
	}
};

const addFirstMessage = async (req, res) => {
	try {
		let docs = await User.find({});
		let msg_id = await Response.findOne({ label: "A" });
		msg_id = msg_id._id;
		console.log(msg_id);

		docs = docs.map(async (val) => {
			val.current_message = msg_id;
			console.log(val);
			const cur = new User(val);
			await cur.save();
		});

		docs = Promise.all(docs);

		res.send("done!");
	} catch (err) {
		console.error(err);
	}
};

export default connectDB(addMessages);
