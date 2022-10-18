import { useEffect, useState } from "react";
import { List } from "./List.js";

/**
 * UseEffect ejecuta una funcion caada vez que se reenderiza un componente
 * 1. Fetch && Axios
 * 2. UseEffect
 * 3. Alterar Datos del servidor
 */

export const Note = (props) => {

	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");

	// Use effect se ejecutara cada vez que reenderiza componente, para evitar que se ejecute en multiples reenderings, usamos []
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then(response => response.json())
			.then(json => setNotes(json));
	}, []) // se ejecutara dependiendo de los parametros puestos.

	const handleChange = (e) => {
		setNewNote(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const noteToAddState = {
			title: newNote,
			body: newNote,
			userId: 1
		};

		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(noteToAddState),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => setNotes((prevNotes) => prevNotes.concat(json)));

	}

	return (
		<div>
			<h1>NOTES: </h1>
			<hr />
			<div>
				<ul>
					{notes.map((note) => <List key={note.id} {...note} />)}
				</ul>
			</div>

			<form onSubmit={handleSubmit}>
				<input type="text" onChange={handleChange}></input>
				<button>Crear Nota</button>
			</form>
		</div>
	)
}