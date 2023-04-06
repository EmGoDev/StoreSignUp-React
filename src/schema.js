import mongoose from "mongoose";

// here we can specify the data type for each data socket

const userSchema = new mongoose.Schema({
	Company: { type: String, required: true },
	Responsavel: { type: String, required: true},
	Telefone: { type: Number, required: true },
	EnderecoCEP: { type: String, required: true, unique: true  },
	Logradouro: { type: String, required: true },
	Numero: { type: Number },
	Complemento: { type: String },
	Bairro: { type: String, required: true },
	Cidade: { type: String, required: true },
	UF: { type: String, required: true }
});

/*
const userSchema = new mongoose.Schema({
	NomeDaLoja: { type: String, required: true },
	Responsavel: { type: String, required: true},
	EnderecoCEP: { type: String, required: true, unique: true  },
	Telefone: { type: Number, required: true }
});
*/

// we are exporting here this model that shows how to imput the data type
// the first parameter is the name we want, and the second is the name of the schema
export default mongoose.model("clientes", userSchema);
