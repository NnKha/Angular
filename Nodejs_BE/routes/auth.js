const jwt = require('jsonwebtoken');
const secretKey = 'Your_access_token_secret_key';

// function authToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];
//   if (typeof bearerHeader !== 'undefined') {
//     const bearerToken = bearerHeader.split(' ')[1];
//     req.token = bearerToken;

//     jwt.verify(bearerToken, secretKey, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ message: 'Invalid access token' });
//       } else {
//         // req.id = decoded.user._id; // Lưu userId vào req object
//         console.log(req);
//         next();
//       }
//     });
//   } else {
//     return res.status(403).json({ message: 'No access token provided' });
//   }
// }

// const jwt = require("jsonwebtoken");

const authen = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, "shhhhh");
            req.user = data.user;
            next();
        } else {
            res.status(401).json({ error: "Not authoried!!" });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
module.exports = authen;
// module.exports = authToken;