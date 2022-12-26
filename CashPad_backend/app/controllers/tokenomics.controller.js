const Tokenomics = require("../models/tokenomics.model.js");

exports.getTokenomics = (req, res) => {

  Tokenomics.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
        res.send(data);
    }
  })
};

exports.addTokenomics = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const tokenomics = new Tokenomics({
    name: req.body.name,
    symbol: req.body.symbol,
    address: req.body.address,
    network: req.body.network,
    decimal: req.body.decimal,
    fname: req.body.fname,
    bio: req.body.bio,
    social: req.body.social,
    website: req.body.website,
    brief: null
  })
  
  Tokenomics.create(tokenomics, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
        res.send(data);
    }
  })
};

exports.updateTokenomics = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const id = req.body.id;
  const tokenomics = new Tokenomics({
    id: req.body.id,
    name: req.body.name,
    symbol: req.body.symbol,
    address: req.body.address,
    network: req.body.network,
    decimal: req.body.decimal,
    fname: req.body.fname,
    bio: req.body.bio,
    social: req.body.social,
    website: req.body.website,
    brief: null
  })
  

  Tokenomics.updateById(id, tokenomics, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else {
        res.send(data);
    }
  })
};

exports.delete = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tokenomics.remove(req.query.id, (err, data) => {
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