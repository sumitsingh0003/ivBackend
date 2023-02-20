const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/InvoiceDatabase";
const mongoURI = "mongodb+srv://bhanu1:QDpKVzYX9yNUt12Q@cluster0.acl8nx3.mongodb.net/Iv-Maker?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);
const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("connected To Mongo Succesfully");
  }).catch((e) => console.log(e));
};


module.exports = connectToMongo;
