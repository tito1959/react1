const { app } = require("../index");
const supertest = require("supertest");

const api = supertest(app);


// test lenght notes retrived
const initialNotes = [
    {
        content: "FullStack MiduDev",
        important: true,
        date: new Date()
    },
    {
        content: "FullStack MiduDev 2",
        important: true,
        date: new Date()
    }
]

module.exports = { initialNotes, api };