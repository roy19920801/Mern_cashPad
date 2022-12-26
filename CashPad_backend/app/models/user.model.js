const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.address = user.address;
  this.password = user.password;
  this.role = user.role;
  this.status = user.status;
  this.amount = user.amount;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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

User.getAll = (address, result) => {
  let query = "SELECT * FROM users";

  if (title) {
    query += ` WHERE address LIKE '%${address}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE tutorials SET name = ?, address = ?, password = ?, status = ? WHERE id = ?",
    [user.name, user.address, user.password, user.status, id],
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

      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.signin = (email, password, result) => {
  let query = "SELECT * FROM users";

  if (email) {
    query += ` WHERE email = '${email}' and password = '${password}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
}

User.getRecentUsers = (result) => {
  let query = "SELECT * FROM `users` where role = 2  ORDER BY ID DESC ";

  sql.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
}

module.exports = User;
