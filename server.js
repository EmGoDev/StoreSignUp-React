import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import schema from "./src/schema.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
//with this i tell express that i will be using json with a limit of 50mb
app.use(express.json({ limit: "50mb" }));

const port = 4230;

// Mongoose DB Connection
mongoose.connect(
	"mongodb+srv://user:AMBLUEABBADEEABBADAAE@cluster0.oxnwe.mongodb.net/clientes?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

// the Endpoint where the data will be stored
app.post("/api/clients", (req, res) => {
	// this variable takes the body of the post (normally client data)
	let clientData = req.body;

	// then this variable array will be iterated
	let mongoRecords = [];
	// searchs in every iteration of clientData
	for (let i = 0, len = clientData.length; i < len; i++) {
		// to finally save it into mongoRecords variable
		mongoRecords.push({
			Company: clientData[i].Company,
			Responsavel: clientData[i].Responsavel,
			Telefone: clientData[i].Telefone,
			EnderecoCEP: clientData[i].EnderecoCEP,
			Logradouro: clientData[i].Logradouro,
			Numero: clientData[i].Numero,
			Complemento: clientData[i].Complemento,
			Bairro: clientData[i].Bairro,
			Cidade: clientData[i].Cidade,
			UF: clientData[i].UF,
		});
	}

	// so we are going to use mongoRecords to save the data in the clientes.js app
	console.log(mongoRecords)
	schema
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

app.delete("/api/clients", (req, res) => {
	schema.deleteMany({}).catch((err) => {
		res.status(500).send(err);
	});
});

app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}`);
});
