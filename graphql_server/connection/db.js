import mongoose from "mongoose"

const MONGO_URI = 'mongodb://localhost:27017/graphql_test'
mongoose.connect(MONGO_URI)
    .then(() => console.log('Database Connected...'))
    .catch((error) => { console.log('Error de conexión mongoDb: ' + error.message) })