const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.dev" });
const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGODB_URL;
const app = express();
const userRoutes = require("./src/api/routes/user-routes");
const HttpError = require("./src/api/models/http-error");

app.use(express.json());

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occurred!" });
});

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server starting at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
