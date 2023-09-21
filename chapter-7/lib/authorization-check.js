const JWT = require('jsonwebtoken');

function AuthorizationCheck(req, res, next) {
    const token = req.cookies.token;
    if(token) {
        try {
            const validToken = JWT.verify(token, process.env.JWT_SECRET);
            console.log('token: ', validToken);
            next();
        } catch(error) {
            res.status(401).send('Not Authorized');
            console.log('error', error);
        }
    } else {
        res.status(401).send('Not Authorized');
    }
}

module.exports = { AuthorizationCheck }