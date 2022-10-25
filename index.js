/**
 * Conectando la api a MongoDb y testeando las request, aplicando eslint y package.json
 * importante el orden de los middleware
 */

require('dotenv').config(); // manejador de .env

require('./Model/Connection');
const Note = require('./Model/Note');
const usersRouter = require('./Controller/userController');

const express = require('express');
const cors = require('cors');
const app = express();

// ejecutamos la app:
app.use(express.json());
app.use(cors());

// Peticiones HTTP:

app.use('/api/users', usersRouter);

app.get('/', (request, response) => {
    response.send('<h1>Hello World From Express.js</h1>');
});

// Get All -Note.find las llaves indican que devuelva todos los datos.
app.get('/api/notes', async (request, response) => {
    const notes = await Note.find({});
    response.json(notes);
});

// Get ById
app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;

    Note.findById(id).then(note => {
        note ? response.json(note) : response.status(404).end();
    }).catch(err => {
        next(err);
    });
});

// Delete
app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;

    Note.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
});

// POST (crear recurso)
app.post('/api/notes', async (request, response, next) => {
    // JsonParse para las solicitudes 
    const note = request.body;

    if (!note.content) { return response.status(400).json({ error: 'required "content" field is missing' }); }

    const newNote = new Note({
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important !== 'undefined' ? note.important : false,
    });

    try {
        const savedNote = await newNote.save();
        response.json(savedNote);
    } catch (error) {
        next(error);
    }

    // newNote.save().then(saveNote => {
    // response.json(saveNote)
    // });
});

app.put('/api/notes/:id', (request, response) => {
    const { id } = request.params;
    const note = request.body;

    const newNoteInfo = {
        content: note.content,
        important: note.important
    };

    Note.findByIdAndUpdate(id, newNoteInfo).then(result => {
        response.json(result);
    });
});

// middleware para error 404
app.use((request, response) => {
    response.status(404).end();
});

// middleware para capturar error de post
app.use((error, request, response) => {
    console.log(error);
    console.log(error.name);

    if (error.name === 'CastError') {
        response.status(400).send('Error, id is malformed');
    } else {
        response.status(500).end();
    }
});

/**
 * Propiedades del servidor:
 */
const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));

module.exports = { app, server };