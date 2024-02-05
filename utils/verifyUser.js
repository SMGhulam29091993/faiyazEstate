const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res, next) => {
    let token;

    // Check if the token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
        console.log("Token : ", token);
    }
    // If not in the header, check if it's in the cookie
    else if (req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
        console.log("Token : ", token);
    }

    if (!token) {
        res.status(401).send({ message: "Unauthorized User", success: false });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token Verification Error:", err);
            res.status(402).send({ message: "Unauthorized User", success: false });
            return;
        }

        // Token is valid, proceed with the request
        req.user = user;
        console.log("Decoded User:", user);
        next();
    });
};
