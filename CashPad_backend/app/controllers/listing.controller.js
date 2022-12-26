const Listing = require("../models/listing.model.js");

exports.getListing = (req, res) => {

  Listing.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    } else {
      if (data) {
        res.send({ success: true, listing: data });
      } else {
        res.send({ success: false });
      }
    }
  });
};

exports.createListing = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const listing = new Listing({
    price: req.body.price,
    token_id: req.body.token_id,
    hardcap: req.body.hardcap,
    down: req.body.down,
    currency_accept: req.body.currency_accept
  })

  Listing.create(listing, (err, data) => {
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

exports.updateListing = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const listing = new Listing({
    price: req.body.price,
    token_id: req.body.token_id,
    hardcap: req.body.hardcap,
    down: req.body.down,
    currency_accept: req.body.currency_accept
  })

  Listing.updateById(req.body.id, listing, (err, data) => {
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

  Listing.remove(req.query.id, (err, data) => {
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

