import mongoose from "mongoose";
import express from "express";
import clientes from "./src/api/models/clientes.js";
const app = express();
const port = 4230;

const mongoURL =
	"mongodb+srv://user:AMBLUEABBADEEABBADAAE@cluster0.oxnwe.mongodb.net/clientes?retryWrites=true&w=majority";
mongoose.connect(
	mongoURL,
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

// the actions done between the requset and the response
app.use(express.json({ limit: "50mb" })); //with this i tell express that i will be using json with a limit of 50mb

// the Endpoint where the data will be stored
app.post("/api/clients", (req, res) => {
	// this variable takes the body of the post (normally client data)
	let clientData = req.body;
	// then show it in a console log
	console.log(clientData);

	// then this variable iterates the posted client data
	let mongoRecords = [];
	for (let i = 0, len = clientData.length; i < len; i++) {
			// searchs in every iteration of clientData
			console.log("EMPEZANDO A PUSHEAR, los datos son:")
			console.log(clientData[i].NomeDaLoja)
			console.log(clientData[i].Responsavel)
			console.log(clientData[i].EndereçoCEP)
			console.log(clientData[i].Telefone)

			// to finally save it into mongoRecords variable
			mongoRecords.push({
				NomeDaLoja: clientData[i].NomeDaLoja,
				Resposnsavel: clientData[i].Responsavel,
				EndereçoCEP: clientData[i].EndereçoCEP,
				Telefone: clientData[i].Telefone,
			});
	}

	/* THIS CHUNK IS NOT WORKEENG
	clientData.forEach((client) => {
		// searchs in every iteration (client var) and retrieves the data
		// to finally save it into mongoRecords var
		mongoRecords.push({
			NomeDaLoja: client.NomeDaLoja,
			Responsavel: client.Responsavel,
			EndereçoCEP: client.EndereçoCEP,
			Telefone: client.Telefone,
		});
	});
	*/

	// so we are going to use mongoRecords to save the data in the clientes.js app
	clientes
		.create(mongoRecords)
		.then((records) => {
			res.status(200).send(records);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

app.get("/", (req, res) => {
	res.send("Seems like Express runs jut fine!");
});

app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}`);
});
