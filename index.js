require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
connectToMongo();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors({ credentials: true, origin: 'http://192.168.1.48:3000' }));
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://192.168.1.48:3000', 'https://make-invoice.netlify.app', 'http://192.168.43.98:3000'] }));
// app.use(cors({ credentials: true, origin: 'http://192.168.43.98:3000' }));

app.get("/", (req, res) => {
  res.send('Api is Working');
});

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(process.env.PORT, () => {
  console.log(`My Notebok app listening at http://localhost:${process.env.PORT}`);
});
