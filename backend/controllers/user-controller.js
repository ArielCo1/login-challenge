const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code === 11000) {
                res.status(422).send(['Duplicate email address found.']);
            } else {
                return next(err);
            }
        }

    });
}

module.exports.authenticate = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(200).json({"token": user.generateJwt()});
        } else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if (!user) {
                return res.status(404).json({status: false, message: 'User not found.'});
            } else {
                return res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email'])});
            }
        }
    );
}

module.exports.users = (req, res) => {
    User.find((err, users) => {
            if (!users) {
                return res.status(404).json({status: false, message: 'Users not found.'});
            } else {
                const sendUsers = users.map(user => ({fullName: user.fullName, email: user.email}));
                return res.status(200).json(sendUsers);
            }
        }
    );
}