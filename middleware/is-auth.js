const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method != 'OPTIONS') {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            token = authHeader.split(' ')[1];
        } else {
            const error = new Error("Authorization header doesn't exists");
            error.statusCode = 401;
            throw error;
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (err) {
            err.statusCode = 500;
            throw err
        }
        req.user_id = decodedToken.userId;
    }

    next();
}