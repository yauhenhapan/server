const sql = require("./db.js");

const ProductType = function (producttype) {
    this.id_type = producttype.id_type;
    this.name = producttype.name;
    this.img_url = producttype.img_url
};

ProductType.findById = (typeId, result) => {
    const queryFindbyId = `SELECT * FROM PRODUCT_TYPES WHERE id_type = '${typeId}'`;
    sql.query(queryFindbyId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("найдено тип: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

ProductType.getAll = result => {
    const queryAll = "SELECT * FROM PRODUCT_TYPES";
    sql.query(queryAll, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product type: ", res);
        result(null, res);
    });
};

module.exports = ProductType;