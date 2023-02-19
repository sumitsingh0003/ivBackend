const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/InvoiceDatabase";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected To Mongo Succesfully");
  });
};

module.exports = connectToMongo;
