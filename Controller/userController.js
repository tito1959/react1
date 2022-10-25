const usersRouter = require('express').Router();
const User = require('../Model/User');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, res) => {

    const { body } = request;
    const { username, name, password } = body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

module.exports = usersRouter;