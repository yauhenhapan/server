module.exports = app => {
    const producttypes = require("../controllers/producttype.controller.js");

    app.get("/types", producttypes.findAll);

    app.get("/type/:typeId", producttypes.findOne);
};