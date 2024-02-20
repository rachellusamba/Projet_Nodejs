const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({message:'Token non fourni'});
    }
    jwt.verify(token,'Rachel_key', (err, decoded) => {
        if (error) {
            return res.status(401).json({message:'Token invalide'});
        }
        req.user = decoded;
        next()
    });
};

module.exports = verifyToken;