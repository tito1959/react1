import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: { type: String, unique: true, require: true, minLength: 5 },
    phone: { type: String, minLength: 5 },
    street: { type: String, required: true, minLength: 5 },
    city: { type: String, required: true, minLength: 5 }
})

export const Person = mongoose.model('Person', schema)