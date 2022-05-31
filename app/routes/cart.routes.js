module.exports = app => {
    const carts = require("../controllers/cart.controller.js");

    app.post("/carts", carts.create);

    app.get("/carts", carts.findAll);

    app.get("/carts/:userMail", carts.findKeyProductsFromCartByUserMail);

    app.delete("/carts/:userMail/:keyProduct", carts.deleteProductFromCartByKeyProduct);

    app.delete("/carts/:userMail", carts.deleteAllProductsFromCartByMail);
};