const Order = require("../models/order.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "У нас не может не быть контента"
        });
    }
    const order = new Order({
        user_name: req.body.user_name,
        user_surname: req.body.user_surname,
        user_mail: req.body.user_mail,
        user_phone_number: req.body.user_phone_number,
        key_product: req.body.key_product
    });
console.log(order);
    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Произошла ошибка во время выполнения кода"
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Что-то случилось во время получения всех заказов"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
    });
};

exports.findSpecificOrders = (req, res) => {
    Order.getOrdersByUserMail(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет заказа с почтой ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением заказа с почтой" + req.params.userMail
                });
            }
        } else res.send(data);
    });
};

exports.findKeyProductsByUserMail = (req, res) => {
    Order.getKeyProductsByUserMail(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет заказа с почтой ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением заказа с почтой" + req.params.userMail
                });
            }
        } else res.send(data);
    });
};