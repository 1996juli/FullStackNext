const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const { validationResult } = require('express-validator');

exports.authUser = async (req, res, next) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;

    const user = await User.findOne({  email });

    //console.log(user);
    if(!user) {
        res.status(401).json({msg : 'The user doesn´t exist'});
        return next();
    } 

    // Verificar el password y autenticar el usuario
    if(bcrypt.compareSync(password, user.password )) {
        // Crear JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '8h'
        });

        res.json({ token })

    } else {
        res.status(401).json({msg: "Password Wrong"});
        return next();
    }
}

exports.authenticatedUser = async (req, res, next) => {
    res.json({ user: req.user })
}