const sql = require("./db.js");

const Product = function (product) {
    this.id_product = product.id_product;
    this.name = product.name;
    this.description = product.description
    this.price = product.price
    this.id_subtype = product.id_subtype
    this.img_url = product.img_url
};

Product.getAll = result => {
    const queryAll = "SELECT id_product, name, description, price, id_subtype, img_url FROM PRODUCTS";
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

Product.getProductBySubTypeId = (subTypeId, result) => {
    const queryFindbySubTypeId = `SELECT id_product, name, description, price, id_subtype, img_url FROM PRODUCTS WHERE id_subtype = '${subTypeId}'`;
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

Product.getProductByProductId = (productId, result) => {
    const queryFindbyProductId = `SELECT id_product, name, description, price, id_subtype, img_url FROM PRODUCTS WHERE id_product = '${productId}'`;
    sql.query(queryFindbyProductId, (err, res) => {
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
        // когда ничего не удалось найти
        result({ kind: "not_found" }, null);
    });
};

module.exports = Product;