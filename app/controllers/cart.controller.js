const Cart = require("../models/cart.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "У нас не может не быть контента"
        });
    }
    const cart = new Cart({
        user_mail: req.body.user_mail,
        key_product: req.body.key_product
    });
console.log(cart);
    Cart.create(cart, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Произошла ошибка во время выполнения кода"
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Cart.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Что-то случилось во время получения всех товар добавленных в корзину"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
    });
};

exports.findSpecificProductsFromCart = (req, res) => {
     Cart.getProductsFromCartByUserMail(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `В корзине нет товаров с почтой ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением товаров с почтой" + req.params.userMail
                });
            }
        } else res.send(data);
    });
};

exports.findKeyProductsFromCartByUserMail = (req, res) => {
    Cart.getKeyProductsFromCartByUserMail(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `В корзине нет товаров с почтой ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением товаров с почтой" + req.params.userMail
                });
            }
        } else res.send(data);
    });
};

exports.deleteProductFromCartByKeyProduct = (req, res) => {
    Cart.removeProductFromCartByKeyProduct(req.params.userMail ,req.params.keyProduct, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найден товар с ${req.params.keyProduct}`
          });
        } else {
          res.status(500).send({
            message: `Не могу удалить товар с  + ${req.params.keyProduct}`
          });
        }
      } else res.send({ message: `товар был успешно удален` });
    });
};

exports.deleteAllProductsFromCartByMail = (req, res) => {
    Cart.removeAllProductsFromCartByMail(req.params.userMail, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найден товар с ${req.params.keyProduct}`
          });
        } else {
          res.status(500).send({
            message: `Не могу удалить товар с  + ${req.params.keyProduct}`
          });
        }
      } else res.send({ message: `Товар былы успешно удалены` });
    });
};
