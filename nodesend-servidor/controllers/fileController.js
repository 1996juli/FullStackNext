const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Link');

exports.uploadFile = async (req, res, next) => {

    const configurationMulter = {
        limits : { fileSize : req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname +'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}` );
            }
        })
    }
    
    const upload = multer(configurationMulter).single('file');


    upload( req, res, async (error) => {
        //console.log(req.file);

        if(!error) {
            res.json({file: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
}

exports.deleteFile = async (req, res ) => {
    //console.log(req.file)

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        //console.log('File delete');
    } catch (error) {
        console.log(error);
    }
}

// Descarga un archivo
exports.download = async (req, res, next) => {

    // Obtiene el enlace
    const { file } = req.params

    console.log(file);

    const link = await Links.findOne({ name: file });

    const fileDownload = __dirname + '/../uploads/' + file ;
    res.download(fileDownload);

    // Eliminar el archivo y la entrada de la BD
    // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
    const { download, name } = link;

    if(download === 1) {

        // Eliminar el archivo 
        req.file = name;

        // eliminar la entrada de la bd
        await Links.findOneAndRemove(link.id);
        next()
    } else {
         // si las descargas son > a 1 - Restar 1
         link.download--;
         await link.save();
    }
}
