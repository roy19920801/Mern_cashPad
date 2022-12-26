const sql = require("./db.js");

// constructor
const Project = function (project) {
    this.category = project.category;
    this.status = project.status;
    this.token_id = project.token_id;
};

Project.create = (newProject, result) => {
    sql.query("INSERT INTO projects SET ?", newProject, (err, res) => {
        if (err) {
            result({ message: "Token already exists. Please check it again!" }, null);
            return;
        }
        result(null, { success: true, id: res.insertId, ...newProject });
    });
};

Project.findById = (id, result) => {
    sql.query(`SELECT * FROM projects WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Project.getAll = (result) => {
    let query = "SELECT projects.*, tokenomics.name FROM projects LEFT JOIN tokenomics on projects.token_id = tokenomics.id ";

    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Project.updateById = (id, project, result) => {
    sql.query(
        "UPDATE projects SET token_id = ?, category = ?, status = ? WHERE id = ?",
        [
            project.token_id,
            project.category,
            project.status,
            id
        ],
        (err, res) => {
            if (err) {
                result(null, {message: "Token already exists or database has wrong. Please try again!"});
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { success: true, id: id, ...project });
        }
    );
};

Project.remove = (id, result) => {
    sql.query("DELETE FROM projects WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

Project.removeAll = result => {
    sql.query("DELETE FROM projects", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Project;
