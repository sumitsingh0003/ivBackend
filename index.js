const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');




connectToMongo();
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static('public/images'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


const port = 4000;

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`My Notebok app listening at http://localhost:${port}`);
});
