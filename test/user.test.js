const bcrypt = require('bcrypt');
const User = require('../Model/User');
const { api, getUsers } = require('./helpers');
const mongoose = require('mongoose');
const { server } = require('../index');

describe('creating a new user', () => {

    beforeEach(async () => {

        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('pswd', 10);
        const user = new User({ username: 'MarcusTester', passwordHash });

        await user.save();
    });


    test('works as expected creating a fresh username', async () => {

        const usersAtStart = await getUsers();

        const newUser = {
            username: 'MarcusTester123',
            name: 'Marcus',
            password: 'admin123'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await getUsers();

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username is already taken', async () => {

        const usersAtStart = await getUsers();

        const newUser = {
            username: 'MarcusTester',
            name: 'Marcus',
            password: 'admin321'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error.code).toBe(11000);

        const usersAtEnd = await getUsers();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });
});
