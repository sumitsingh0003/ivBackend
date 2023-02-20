const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/InvoiceDatabase";

mongoose.set('strictQuery', false);
const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("connected To Mongo Succesfully");
  }).catch((e) => console.log(e));
};


module.exports = connectToMongo;
