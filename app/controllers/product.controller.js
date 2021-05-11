const Product = require("../models/product.model.js");


// Получение всех типов
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Что-то случилось во время получения всех товаров"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
    });
};

exports.findSpecificProducts = (req, res) => {
    Product.getProductBySubTypeId(req.params.subTypeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет подтипа с id ${req.params.subTypeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением типа по id" + req.params.subTypeId
                });
            }
        } else res.send(data);
    });
};

exports.findProduct = (req, res) => {
    Product.getProductByProductId(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет подтипа с id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением типа по id" + req.params.productId
                });
            }
        } else res.send(data);
    });
};