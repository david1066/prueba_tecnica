const express= require('express');
const router =express.Router();
var UserController = require('../controllers/user');

router.post('/register',UserController.register);
router.post('/login',UserController.login);

router.put('/update/:id',UserController.update);
router.delete('/delete/:id',UserController.delete);
router.get('/users/:name/:surname/:document/:idcity',UserController.getAllUser);
router.get('/:id',UserController.getUser);


module.exports= router;