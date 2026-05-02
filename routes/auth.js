const { Router } = require('express');
const { validateRegister, ValidateLogin } = require('../middleware/userValidation');
const { register, login, user, validateToken,  } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', ValidateLogin, login);

router.get('/user',authenticateJWT,user);
//Validate client side token
router.get('/token',authenticateJWT,validateToken);

module.exports = router;