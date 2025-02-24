const express = require("express");
// const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));

app.use(require("./src/utils/errorHandler"));

app.listen(3000, () => console.log("Server started on port 3000"));