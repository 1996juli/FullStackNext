const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

module.exports = function(req, res, next) {

    // Leer el token del header
    const token = req.header('x-auth-token');
    //console.log(token);
 
    // Revisar si no hay token
    if(token) {
        try {
            const cifrado = jwt.verify(token, process.env.SECRET);
            // console.log(cifrado)
            req.user = cifrado;
            // console.log(req.user);
        } catch (error) {
            res.status(401).json({msg: 'Invalid token'});
        } 
    }
    
    return next();
} 

