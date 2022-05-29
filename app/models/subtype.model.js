const sql = require("./db.js");

const SubType = function (subtype) {
    this.id_subtype = subtype.id_subtype;
    this.name = subtype.name;
    this.id_type = subtype.id_type
    this.img_url = subtype.img_url
};

SubType.getAll = result => {
    const queryAll = "SELECT * FROM PRODUCT_SUBTYPES";
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

SubType.getSubTypesByTypeId = (typeId, result) => {
    const queryFindbySubTypeId = `SELECT * FROM PRODUCT_SUBTYPES WHERE id_type = '${typeId}'`;
    sql.query(queryFindbySubTypeId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product type: ", res);
        result(null, res);
    });
};

SubType.getSubTypeBySubTypeId = (subTypeId, result) => {
    const queryFindbySubTypeId = `SELECT * FROM PRODUCT_SUBTYPES WHERE id_subtype = '${subTypeId}'`;
    sql.query(queryFindbySubTypeId, (err, res) => {
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

module.exports = SubType;