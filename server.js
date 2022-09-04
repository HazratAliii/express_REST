const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();
const port = process.env.PORT;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
  })
);
app.use(cookieParser());

// Routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/productRoutes");

app.use("/api/auth", authRoute);
app.use("/product", productRoute);

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
