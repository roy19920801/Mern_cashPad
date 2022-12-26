const sql = require("./db.js");

// constructor
const Tokenomics = function (tokenomics) {
  this.network = tokenomics.network;
  this.name = tokenomics.name;
  this.symbol = tokenomics.symbol;
  this.decimal = tokenomics.decimal;
  this.address = tokenomics.address;
  this.fname = tokenomics.fname;
  this.bio = tokenomics.bio;
  this.social = tokenomics.social;
  this.website = tokenomics.website;
  this.brief = tokenomics.brief;
};

Tokenomics.create = (newTokenomics, result) => {
  sql.query("INSERT INTO tokenomics SET ?", newTokenomics, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newTokenomics });
  });
};

Tokenomics.findById = (id, result) => {
  sql.query(`SELECT * FROM tokenomics WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tokenomics.getAll = (symbol, result) => {
  let query = "SELECT * FROM tokenomics";

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Tokenomics.updateById = (id, tokenomics, result) => {
  sql.query(
    "UPDATE tokenomics SET name = ?, address = ?, network = ?, symbol = ?, `decimal` = ?, fname = ?, bio = ?, social = ?, website = ? WHERE id = ?",
    [ tokenomics.name, 
      tokenomics.address, 
      tokenomics.network, 
      tokenomics.symbol,
      tokenomics.decimal, 
      tokenomics.fname, 
      tokenomics.bio, 
      tokenomics.social, 
      tokenomics.website, 
      id
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...tokenomics });
    }
  );
};

Tokenomics.remove = (id, result) => {
  sql.query("DELETE FROM tokenomics WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Tokenomics.removeAll = result => {
  sql.query("DELETE FROM tokenomics", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Tokenomics;
