const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * Convirtiendo el shema a JSON sin los valores __v y _id:
 */

noteSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

// esto creara automaticamente el nombre de los datos en plural 'notes'
const Note = model('Note', noteSchema);

module.exports = Note;

/*
note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close();
    })
    .catch(err => console.error(err))
*/