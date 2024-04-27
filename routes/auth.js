const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Library for one way hashing the password which can't be reverse
const { body, validationResult } = require("express-validator"); //Library for checking the validation of the the input at the time of the authentication
var jwt = require("jsonwebtoken"); //Library for  using web token which we give to the user after login
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "JsonWebTokenSecret"; //



// ROUTE 1 :  Create a user using: Post "/api/auth/createUser"
router.post("/createuser", [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be more than 5 character").isLength({ min: 5 }),
], async (req, res) => {
  let success = true;
  // If there are errors , return bad errors and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //Check Whether the user this Email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
    }
    //Create a new User
    const salt = await bcrypt.genSalt(10); //Firstly we create a salt to add on the password of the user

    // In this we create a hash of the user password and the salt
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    // To send the user its detail.But we wont send it we will give user a token
    // .then(user => res.json(user))

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    //Its a token which we send to the user after the authenticating.
    res.json({ success, authToken });
    // console.log(user);
    // .catch(err => console.log(err));
    // res.json({error : 'Please enter a unique value for Email', message : err.message })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Serval Error Occured");
  }

}
);

// ROUTE 2 : Login a user : Post "/api/auth/login", No login required
router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "password cannnot blank").exists(), // It checks the password cannot be blanks
], async (req, res) => {
  let success = true;
  //If email is invalid or password is empty , return bad request and the errors without touching the Database so it does not put pressure on our database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  // Destructuring - getting email and password from the req.body of the user who is trying to login
  const { email, password } = req.body; // login karne wale ki email or password hai
  try {
    // Login karenge wale ki email check karenge
    let user = await User.findOne({ email });
    // Agar user ki email match nhi karti to error denge
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct details" });
    }
    // Password ke hasses ko compare karenge jo user ne daala hai or jo existing user ka password hai {password - jo daala hai , user.password - jo pehle se hai}
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct details" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success, authToken });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send(success, "Internal Servor error occcured");
  }
}
);

// Route 3: Get loggedin UserDetails using : POST "/api/user/getuser". Login required
// isme login required hai or fetchuser - user ko fetch karta hai - or fetchuser-req, res ko modify karta hai -fir usme se hum userid mil jaati hai
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Servor error occcured");
  }
});

module.exports = router;
