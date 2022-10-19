const express = require("express");
const cors = require('cors')

let notes = [
	{
		"userId": 1,
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	},
	{
		"userId": 1,
		"id": 2,
		"title": "qui est esse",
		"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
	},
	{
		"userId": 1,
		"id": 3,
		"title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
		"body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
	},
	{
		"userId": 1,
		"id": 4,
		"title": "eum et est occaecati",
		"body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
	},
	{
		"userId": 1,
		"id": 5,
		"title": "nesciunt quas odio",
		"body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
	},
	{
		"userId": 1,
		"id": 6,
		"title": "dolorem eum magni eos aperiam quia",
		"body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
	}

];

// ejecutamos la app:
const app = express();
app.use(express.json());

// Peticiones HTTP:
app.get("/", (request, response) => {
	response.send("<h1>Hello World From Express.js</h1>");
});

// Get All
app.get("/api/notes", (request, response) => {
	response.json(notes);
});

// Get ById
app.get("/api/notes/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const note = notes.find(note => note.id === id);

	if (note) {
		response.json(note);
	} else {
		response.send("<h1>Elemento no encontrado</h1>");
		// response.status(303).end();
	}
});

// Delete
app.delete("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);
	response.status(204).end();
});

// POST (crear recurso)
app.post("/api/notes", (request, response) => {

	// JsonParse para las solicitudes 
	const note = request.body;

	const ids = notes.map(note => note.id);
	const maxId = Math.max(...ids);

	const newNote = {
		id: maxId + 1,
		content: note.content,
		important: typeof note.important !== "undefined" ? note.important : false,
		date: new Date().toISOString()
	};

	notes = [...notes, newNote];
	response.json(newNote);
});

/**
 * Propiedades del servidor:
 */

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));