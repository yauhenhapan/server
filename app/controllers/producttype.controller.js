const ProductType = require("../models/producttype.model.js");

exports.findAll = (req, res) => {
    ProductType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Что-то случилось во время получения всех типов"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
    });
};

exports.findOne = (req, res) => {
    ProductType.findById(req.params.typeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет типа с id ${req.params.typeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением типа по id" + req.params.typeId
                });
            }
        } else res.send(data);
    });
};