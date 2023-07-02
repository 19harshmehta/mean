const jwt = require("jsonwebtoken")
const { SEC_KEY } = process.env

module.exports = function(req, res, next) {
    const token = req.headers.authorization; // Extract token from headers (assuming it's included as a Bearer token)
    console.log(token);
    
    if (token) {
      jwt.verify(token, SEC_KEY, (err, decoded) => {
        if (err) {
          // Token verification failed
          return res.status(401).json({ msg: 'Invalid token' });
        }
  
        if (decoded.exp - Date.now() / 1000 < 86400) {
          // Token is about to expire within 1 day (86400 seconds)
          const refreshedToken = jwt.sign(
            { email: decoded.email, userId: decoded.userId, role: decoded.role },
            SEC_KEY,
            { expiresIn: '60s' }
          );
          res.setHeader('Authorization', refreshedToken); // Set the refreshed token in the response header
        }
  
        // Token is valid and not about to expire, continue processing the request
        next();
      });
    } else {
      // No token found
      res.status(401).json({ msg: 'Missing token' });
    }
  };

  