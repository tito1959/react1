/**
 * La libreria supertest, permite realiar testings en entornos de servidor, permitiendo realizar
 * pruebas en endpoints y evaluar sus respuestas.
 * 
 * En testing mantener la consola limpia es importante, si segeneran warnings o informacion poco reelevante para el estes es posible
 * limpiarla usando flags en el package.json
 * 
 * Los test no pueden depender de valores externos, siempre que se ejecuta un test debe dar el mismo resultado para el código.
 */
const mongoose = require("mongoose");
const { server } = require("../index");
const { initialNotes, api } = require("./helpers");

// gestion de la bd:
const Note = require("../Model/Note");


// Hook para ejecutar las initialNotes
beforeEach(async () => {
    await Note.deleteMany({});

    // const note1 = new Note(initialNotes[0]);
    // await note1.save();

    // const note2 = new Note(initialNotes[1]);
    // await note2.save();

    /**
     * Un foreach o un map limitan a la asincronia
     * a ejecutarse de forma continua, usar un for permite a la asincronia ejecutarse
     * secuencialmente
     */

    for (const note of initialNotes) {
        const noteObject = new Note(note);
        await noteObject.save();
    }

})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
});

test('notes are two notes', async () => {
    const res = await api.get('/api/notes');
    expect(res.body).toHaveLength(initialNotes.length);
});

test('the first note is about midudev', async () => {
    const res = await api.get('/api/notes');

    const notes = res.body.map(note => note.content);

    expect(notes).toContain('FullStack MiduDev');
});

test('a valid note can be added', async () => {
    const newNote = {
        content: 'Proximamente async/await',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)

    const response = await api.get('/api/notes');
    const contents = response.body.map(note => note.content);

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content);

});

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length)
});

test('a note can be deleted', async () => {
    // borrar la nota de la pos 0
    const notes = await api.get('/api/notes');
    const noteToDelete = notes.body[0];


    await api
        .delete(`/api/notes/${noteToDelete._id}`)
        .expect(204)

    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length - 1);
    expect(response.body).not.toContain(noteToDelete);
});


// cerrando la conexion con un hook que devuelve un callback
afterAll(() => {
    mongoose.connection.close();
    server.close();
})