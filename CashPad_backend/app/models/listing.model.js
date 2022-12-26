const sql = require("./db.js");

// constructor
const Listing = function (listing) {
    this.price = listing.price;
    this.hardcap = listing.hardcap;
    this.currency_accept = listing.currency_accept;
    this.token_id = listing.token_id;
    this.down = listing.down;
};

Listing.create = (newListing, result) => {
    sql.query("INSERT INTO listing_info SET ?", newListing, (err, res) => {
        if (err) {
            result({ message: "Token already exists. Please check it again!" }, null);
            return;
        }
        result(null, { success: true, id: res.insertId, ...newListing });
    });
};

Listing.findById = (id, result) => {
    sql.query(`SELECT * FROM listing_info WHERE id = ${id}`, (err, res) => {
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

Listing.getAll = (result) => {
    let query = "SELECT listing_info.*, tokenomics.name FROM listing_info LEFT JOIN tokenomics on listing_info.token_id = tokenomics.id ";

    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Listing.updateById = (id, listingInfo, result) => {
    sql.query(
        "UPDATE listing_info SET token_id = ?, price = ?, hardcap = ?, currency_accept = ?, down = ? WHERE id = ?",
        [
            listingInfo.token_id,
            listingInfo.price,
            listingInfo.hardcap,
            listingInfo.currency_accept,
            listingInfo.down,
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

            result(null, { success: true, id: id, ...listingInfo });
        }
    );
};

Listing.remove = (id, result) => {
    sql.query("DELETE FROM listing_info WHERE id = ?", id, (err, res) => {
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

Listing.removeAll = result => {
    sql.query("DELETE FROM listing_info", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Listing;
