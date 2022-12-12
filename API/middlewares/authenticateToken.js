const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

 function rootAuthentificationToken(req, res, next) {    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (user === undefined) return res.sendStatus(403);
        const userVerif = await User.whereEmail(user.email);
        if (err || userVerif.roleId != 1) return res.sendStatus(403);
            req.user = user;
            next();
    })
}

module.exports = {
    authenticateToken,
    rootAuthentificationToken,
};