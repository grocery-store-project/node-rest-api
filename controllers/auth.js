const User = require('../models/user');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    bcrypt.hash(password, 12).then(hashPass => {
        User.create({
            email, first_name, last_name, password: hashPass
        }).then(user => {
            res.status(201).json({ message: "User created successfully" })
        }).catch(err => {
            next(new Error(err));

        })
    }).catch(err => {
        next(new Error(err));
    })
}

exports.signIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email } }).then(user => {
        if (!user) {
            const error = new Error("This login doesn't exists");
            error.statusCode = 401;
            throw error;
        }
        userData = user;
        return bcrypt.compare(password, user.password)

    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: userData.email, userId: userData.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ token })

    }).catch(err => {
        next(new Error(err));
    })
}