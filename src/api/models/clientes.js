import mongoose from "mongoose";

// here we can specify the data type for each data socket
const storeSchema = mongoose.Schema({
	NomeDaLoja: String,
	Responsavel: String,
	EndereçoCEP: Number,
	Telefone: Number,
});

// we are exporting here this model that shows how to imput the data type
// the first parameter is the name we want, and the second is the name of the schema
export default mongoose.model("clientes", storeSchema);
