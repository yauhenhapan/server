module.exports = app => {
    const products = require("../controllers/product.controller.js");

    app.get("/products", products.findAll);

    app.get("/products/:subTypeId", products.findSpecificProducts);

    app.get("/product/:productId", products.findProduct);
};