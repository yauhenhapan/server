module.exports = app => {
    const productsubtypes = require("../controllers/subtype.controller.js");

    app.get("/subtypes", productsubtypes.findAll);

    app.get("/subtypes/:subTypeId", productsubtypes.findSpecificSubTypes);

    app.get("/subtype/:subTypeId", productsubtypes.findSubType);
};