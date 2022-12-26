const Project = require("../models/project.model.js");

exports.getCategory = (req, res) => {

  Project.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    } else {
      if (data) {
        res.send({ success: true, projects: data });
      } else {
        res.send({ success: false });
      }
    }
  });
};

exports.createCategory = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const project = new Project({
    category: req.body.category,
    token_id: req.body.token_id,
    status: req.body.status
  })

  Project.create(project, (err, data) => {
    if (err)
      res.send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
      res.send(data);
    }
  })
}

exports.updateCategory = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const project = new Project({
    category: req.body.category,
    token_id: req.body.token_id,
    status: req.body.status
  })

  Project.updateById(req.body.id, project, (err, data) => {
    if (err)
      res.send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
      res.send(data);
    }
  })
}

exports.delete = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Project.remove(req.query.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
      res.send(data);
    }
  })
}

