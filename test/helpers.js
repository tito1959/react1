const { app } = require('../index');
const supertest = require('supertest');
const User = require('../Model/User');
const api = supertest(app);


// test lenght notes retrived
const initialNotes = [
    {
        content: 'FullStack MiduDev',
        important: true,
        date: new Date()
    },
    {
        content: 'FullStack MiduDev 2',
        important: true,
        date: new Date()
    }
];

/**
 * Get users
 */

const getUsers = async () => {
    const usersDB = await User.find({});
    return usersDB.map(u => u.toJSON());
};

module.exports = { initialNotes, api, getUsers };