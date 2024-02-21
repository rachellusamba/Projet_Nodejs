
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({message:'Token non fourni'});
    }
    jwt.verify(token,process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({message:'Token invalide'});
        }
        req.user = decoded;
        next()
    })
};
module.exports = verifyToken;