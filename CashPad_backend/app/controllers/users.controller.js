const User = require("../models/user.model.js");

exports.getRecentUsers = (req, res) => {

    User.getRecentUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else {
            if (data) {
                res.send({ success: true, users: data });
            } else {
                res.send({ success: false });
            }
        }
    });
};

exports.createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = new User({
        name: req.body.name,
        email: null,
        address: req.body.address,
        password: null,
        role: 2,
        status: req.body.status,
        amount: 0
    })

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else {
            if (data) {
                res.send({ success: true, users: data });
            } else {
                res.send({ success: false });
            }
        }
    });
};
