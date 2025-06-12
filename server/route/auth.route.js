//require express
const express = require ('express')

const User = require('../models/User');
const { register, login } = require('../controllers/auth.controller');
const isAuth = require('../middlewares/isAuth');
const { registerValidation, validation, loginValidation } = require('../middlewares/validator');

const router = express.Router()


// test
// router.get('/essai', (req, res) => {
//     res.status(200).json("le test de la route user!")
// })



//register: sign up
router.post('/register', registerValidation(), validation, register)


//login : sign in
router.post('/login', loginValidation(), validation, login)

//current = l'utilisateur connecté
router.get("/current", isAuth, (req,res) => {
    res.json(req.user)
})


    module.exports = router;