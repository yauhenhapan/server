const sql = require("./db.js");

const Favourite = function (favourite) {
    this.user_mail = favourite.user_mail;
    this.key_product = favourite.key_product;
};

Favourite.create = (newFavourite, result) => {
    sql.query(`INSERT INTO favourites (user_mail, key_product) VALUES ("${newFavourite.user_mail}","${newFavourite.key_product}")`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("res: ", res);
        result(null, res);
    });
};

Favourite.getAll = result => {
    const queryAll = "SELECT * FROM Favourites";
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

Favourite.getProductsFromFavouritesByUserMail = (userMail, result) => {
    const queryFindbyUserMail = `SELECT user_mail, key_product FROM Favourites  WHERE user_mail='${userMail}'`;
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

Favourite.getKeyProductsFromFavouritesByUserMail = (userMail, result) => {
    const queryFindProductsbyUserMail = `select key_product from Favourites WHERE user_mail = '${userMail}'`;
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


Favourite.removeProductFromFavouritesByKeyProduct = (userMail, keyProduct, result) => {

    const queryDelete = `DELETE FROM Favourites WHERE user_mail = '${userMail}' and key_product = '${keyProduct}'`;
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
  
      console.log("Удален товар с  ", keyProduct);
      result(null, res);
    });
  };

module.exports = Favourite;