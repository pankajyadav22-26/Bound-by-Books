const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const cors = require("cors")
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//Port Creation
app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
})