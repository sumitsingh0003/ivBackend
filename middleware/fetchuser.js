// import { verify } from "jsonwebtoken"; //Library for  using web token which we give to the user after login
// const JWT_SECRET = "JsonWebTokenSecret"; //

// const fetchuser = (req, res, next) => {
//   // Get the user from the jwt token and add id to req object
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ error: "Please authenticate using a token " });
//   }
//   try {
//     const data = verify(token, JWT_SECRET);

//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Please authenticate using a valid token " });
//   }
// };

// export default fetchuser;






var jwt = require("jsonwebtoken"); //Library for  using web token which we give to the user after login
const JWT_SECRET = "JsonWebTokenSecret"; //


const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a token " });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token " });
  }
};

module.exports = fetchuser;