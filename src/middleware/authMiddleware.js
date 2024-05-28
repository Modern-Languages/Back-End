const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            message: 'No Token Provided'
        });
    }

    const tokenParts = authorizationHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Invalid Token Format'
        });
    }

    const token = tokenParts[1];

    try {
        const validToken = jwt.verify(token, process.env.TOP_SECRET);
        req.userData = validToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
};

module.exports = authMiddleware;