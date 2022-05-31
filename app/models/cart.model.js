const sql = require("./db.js");

const Cart = function (cart) {
    this.user_mail = cart.user_mail;
    this.key_product = cart.key_product;
};

Cart.create = (newCart, result) => {
    sql.query(`INSERT INTO cart (user_mail, key_product) VALUES ("${newCart.user_mail}","${newCart.key_product}")`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("res: ", res);
        result(null, res);
    });
};

Cart.getAll = result => {
    const queryAll = "SELECT * FROM Cart";
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

Cart.getProductsFromCartByUserMail = (userMail, result) => {
    const queryFindbyUserMail = `SELECT user_mail, key_product FROM Cart  WHERE user_mail='${userMail}'`;
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

Cart.getKeyProductsFromCartByUserMail = (userMail, result) => {
    const queryFindProductsbyUserMail = `select key_product from Cart WHERE user_mail = '${userMail}'`;
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

Cart.removeProductFromCartByKeyProduct = (userMail, keyProduct, result) => {
    
    const queryDelete = `DELETE FROM Cart WHERE user_mail = '${userMail}' and key_product = '${keyProduct}'`;
    var filter = [userMail, keyProduct]
    sql.query(queryDelete, filter, (err, res) => {
      if (err) {
        console.log("error: ", err); 
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "не найдено" }, null);
        return;
      }
  
      console.log("Удален товар с ", keyProduct);
      result(null, res);
    });
};

Cart.removeAllProductsFromCartByMail = (userMail, result) => {
    
    const queryDelete = `DELETE FROM Cart WHERE user_mail = '${userMail}'`;
    sql.query(queryDelete, userMail, (err, res) => {
      if (err) {
        console.log("error: ", err); 
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "не найдено" }, null);
        return;
      }
  
      console.log("Удалены товар с почтой ", userMail);
      result(null, res);
    });
};

module.exports = Cart;