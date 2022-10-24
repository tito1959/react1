const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
	content: String,
	date: Date,
	important: Boolean
});

// esto creara automaticamente el nombre de los datos en plural 'notes'
const Note = model('Note', noteSchema);

module.exports = Note;

/*
const note = new Note({
	content: 'MongoDB es god',
	date: new Date(),
	important: true
})

note.save()
	.then(result => {
		console.log(result)
		mongoose.connection.close();
	})
	.catch(err => console.error(err))
*/