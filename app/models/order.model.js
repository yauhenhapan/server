const sql = require("./db.js");

const Order = function (order) {
    this.user_name = order.user_name;
    this.user_surname = order.user_surname;
    this.user_mail = order.user_mail;
    this.user_phone_number = order.user_phone_number;
    this.key_product = order.key_product;
};

Order.create = (newOrder, result) => {
    sql.query(`INSERT INTO orders (user_name, user_surname, user_mail, user_phone_number, key_product) VALUES ("${newOrder.user_name}","${newOrder.user_surname}","${newOrder.user_mail}","${newOrder.user_phone_number}","${newOrder.key_product}")`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("res: ", res);
        result(null, res);
    });
};

Order.getAll = result => {
    const queryAll = "SELECT user_name, user_surname, user_mail, user_phone_number, key_product FROM ORDERS";
    sql.query(queryAll, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("order ", res);
        result(null, res);
    });
};

Order.getOrdersByUserMail = (userMail, result) => {
    const queryFindbyUserMail = `SELECT user_name, user_surname, user_mail, user_phone_number, key_product FROM ORDERS  WHERE user_mail='${userMail}'`;
    sql.query(queryFindbyUserMail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product type: ", res);
        result(null, res);
    });
};

Order.getKeyProductsByUserMail = (userMail, result) => {
    const queryFindProductsbyUserMail = `select key_product from orders WHERE user_mail = '${userMail}'`;
    sql.query(queryFindProductsbyUserMail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product type: ", res);
        result(null, res);
    });
};

module.exports = Order;