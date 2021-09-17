const Links = require('../models/Link');
const shortid = require('shortid');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

exports.newLink = async (req, res, next) => {
    
    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //console.log(req.body);

    // Crear un objeto de Enlace
    const { name_original, name, password } = req.body;

    const link = new Links();
    link.url = shortid.generate();
    link.name = name;
    link.name_original = name_original;
    link.password = password;
   
    // Si el usuario esta autenticado

    //console.log(req.user);

    if(req.user) {
        const { password, download } = req.body;

        // Asignar a enlace el número de descargas
        if(download) {
            link.download = download;
        }

        // asignar un password
        if(password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash( password, salt );   
        }

        // Asignar el autor
        link.author = req.user.id
    }

    // Almacenar en la BD
    try {
        await link.save();
        return res.json({ msg : `${link.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}

// Obtiene un listado de todso los enlaces
exports.allLinks = async (req, res) => {
    try {
        const links = await Links.find({}).select('url -_id');
        res.json({links});
    } catch (error) {
        console.log(error);
    }
}

// Retorna si el enlace tiene password o no
exports.havePassword = async (req, res, next) => {

    // console.log(req.params.url);
    const { url } = req.params;

    //console.log(url);

    // Verificar si existe el enlace
    const link = await Links.findOne({ url });

    if(!link) {
        res.status(404).json({msg: 'This link does not exist'});
        return next();
    }

    if(link.password) {
        return res.json({ password: true, link: link.url, file: link.name });
    }

    next();
}

// Verifica si el password es Correcto
exports.checkPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password} = req.body;

    // Consultar por el enlace
    const link = await Links.findOne({ url });

    // Verificar el password
    if(bcrypt.compareSync( password, link.password )) {
        // Permitirle al usuario descargar el archivo
        next();
    } else {
        return res.status(401).json({msg: 'Password Wrong'})
    } 
}

// Obtener el enlace
exports.getLink = async (req, res, next) => {

    // console.log(req.params.url);
    const { url } = req.params;

    //console.log(url);

    // Verificar si existe el enlace
    const link = await Links.findOne({ url });

    if(!link) {
        res.status(404).json({msg: 'That Link does not exist'});
        return next();
    }

    // Si el enlace existe
    res.json({file: link.name, password:false })

    next();
}






