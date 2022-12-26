const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    status: 1
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.signin(email, password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
        if(data[0]) {
            res.send({"success": true, user: data[0]});
        }else {
            res.send({success: false});
        }
    }
  });
};

// Find a single Tutorial by Id
exports.signup = (req, res) => {
//   User.create(newUser, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
};
