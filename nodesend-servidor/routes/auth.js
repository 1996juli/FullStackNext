const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


router.post('/', 
    [
        check('email', 'Add valid email').isEmail(),
        check('password', 'The password must be empty').not().isEmpty(),
        
    ],
    authController.authUser
);

router.get('/',
    auth,
    authController.authenticatedUser
);


module.exports = router;