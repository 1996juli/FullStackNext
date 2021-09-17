const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const fileController= require('../controllers/fileController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('name', 'Upload the file').not().isEmpty(),
        check('name_original', 'Upload the file').not().isEmpty()
    ],
    auth,
    linksController.newLink
);

router.get('/',
    linksController.allLinks,
);

router.get('/:url',
    linksController.havePassword,
    linksController.getLink
);

router.post('/:url',
    linksController.checkPassword,
    linksController.getLink
);


module.exports = router;