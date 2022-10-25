const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

userSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;
    }
});

module.exports = model('User', userSchema);