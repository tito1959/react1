import { useState } from "react";
import { List } from "./List.js";


export const Note = (props) => {

	const [notes, setNotes] = useState(props.notes);
	const [newNote, setNewNote] = useState("");

	const handleChange = (e) => {
		setNewNote(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("creando nota...");
		const noteToAddState = {
			id: notes.lenght + 1,
			title: newNote,
			body: newNote
		}

		setNotes((prevNote) => prevNote.concat(noteToAddState));
	}

	return (
		<div>
			<h1>Notes: </h1>
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