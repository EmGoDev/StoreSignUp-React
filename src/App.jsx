import React from "react";
import { Formik, Field, Form } from "formik";
import "./App.css";

function App() {

	function handleSubmit(values, { setSubmitting }) {

    // Object with the form data
    console.log("the data from the formik forms", values)
    setSubmitting(false);

    // Send the Data to the Server
		fetch("http://localhost:4230/api/clients", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		})
			.then(response => {response.json()})
			.then(data => {
        setResponse(data);
        console.log("FORM DATA:", data);
      })
			.catch((error) => console.error(error));
	}

	function onBlurCep(ev, setFieldValue) {
		const { value } = ev.target;

		const cep = value?.replace(/[^0-9]/g, "");

		if (cep?.length !== 8) {
			return;
		}

		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => res.json())
			.then((data) => {
				setFieldValue("Logradouro", data.logradouro);
				setFieldValue("Bairro", data.bairro);
				setFieldValue("Cidade", data.localidade);
				setFieldValue("UF", data.uf);
			});
	}

	return (
		<div className="App">
			<Formik
				onSubmit={handleSubmit}
				validateOnMount
				initialValues={{
					Company: "",
					Responsavel: "",
					Telefone: "",
					EnderecoCEP: "",
					Logradouro: "",
					Numero: "",
					Complemento: "",
					Bairro: "",
					Cidade: "",
					UF: "",
				}}
			>
				{({ isValid, setFieldValue }) => (
					<Form>
						<div className="form-control-group">
							<label>Nome da Loja</label>
							<Field
								name="Company"
								type="text"
								onBlur={(ev) => onBlurCep(ev, setFieldValue)}
							/>
						</div>
						<div className="form-control-group">
							<label>Responsável</label>
							<Field
								name="Responsavel"
								type="text"
								onBlur={(ev) => onBlurCep(ev, setFieldValue)}
							/>
						</div>
						<div className="form-control-group">
							<label>Telefone</label>
							<Field
								name="Telefone"
								type="text"
								onBlur={(ev) => onBlurCep(ev, setFieldValue)}
							/>
						</div>
						<div className="form-control-group">
							<label>CEP</label>
							<Field
								name="EnderecoCEP"
								type="text"
								onBlur={(ev) => onBlurCep(ev, setFieldValue)}
							/>
						</div>
						<div className="form-control-group">
							<label>Logradouro</label>
							<Field name="Logradouro" type="text" />
						</div>
						<div className="form-control-group">
							<label>Número</label>
							<Field name="Numero" type="text" />
						</div>
						<div className="form-control-group">
							<label>Complemento</label>
							<Field name="Complemento" type="text" />
						</div>
						<div className="form-control-group">
							<label>Bairro</label>
							<Field name="Bairro" type="text" />
						</div>
						<div className="form-control-group">
							<label>Cidade</label>
							<Field name="Cidade" type="text" />
						</div>
						<div className="form-control-group">
							<label>Estado</label>
							<Field name="UF" type="text" />
						</div>

						<button type="submit" disabled={!isValid}>
							Enviar
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default App;
