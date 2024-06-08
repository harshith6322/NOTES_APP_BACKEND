const jwt = require("jsonwebtoken");

function authtoken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send("Authorization header missing");

  // // Strip 'Bearer ' prefix if present
  // const token = auth.startsWith("Bearer ") ? auth.slice(7, auth.length) : auth;

  jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user.finduser; // Attach user information to the request object
    next(); // Call next() to proceed to the next middleware or route handler
  });
}

module.exports = {
  authtoken,
};
