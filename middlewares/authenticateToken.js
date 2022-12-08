const jwt = require('jsonwebtoken');
const db = require('../services/db');

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
        if (err) return res.sendStatus(403);
        const result = await db.query(`SELECT role_id FROM users WHERE email = '${user.email}'`);
        console.log(result[0]);
        if (result[0]['role_id'] == 1) {
            req.user = user;
            next()
        }
        return 'error';
    })
}

module.exports = {
    authenticateToken,
    rootAuthentificationToken,
};