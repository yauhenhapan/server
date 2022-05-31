module.exports = app => {
    const favourites = require("../controllers/favourites.controller.js");

    app.post("/favourites", favourites.create);

    app.get("/favourites", favourites.findAll);

    app.get("/favourites/:userMail", favourites.findKeyProductsFromFavouritesByUserMail);

    app.delete("/favourites/:userMail/:keyProduct", favourites.deleteProductFromFavouritesByKeyProduct);
};