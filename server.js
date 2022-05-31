const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Это стартовая страница нашего приложения =)" });
});


require("./app/routes/producttype.routes.js")(app);
require("./app/routes/subtype.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/cart.routes.js")(app);
require("./app/routes/favourite.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});