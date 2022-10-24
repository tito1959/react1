/**
 * Las conexiones a persistencia de datos en MongoDb requiren de: configuracion de cluster en MongoAtlas, aplicacion de gestion de BD, MongoDbCompass.
 * Se debe instalar el driver de mongo con npm install mongoose
 * Schema es la plantilla base en la cual se crearan nuestros datos, podemos establecerla como {Schema} || mongoose.Schema()
 */

const mongoose = require('mongoose');

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const connection = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

// connection, connect devuelve una promesa.
mongoose.connect(connection)
	.then(() => console.log("Database Connected"))
	.catch(err => console.error(err));
