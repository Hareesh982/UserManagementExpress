const express = require('express')
const verify_token = require('../middleware/verification')
const {register,login,profile,transaction,wishlist} = require('../controllers/userController')
const router = express.Router()


router.post('/register',register)
router.get('/login',login)


router.get('/profile',verify_token,profile)
router.get('/transaction',verify_token,transaction)
router.get('/wishlist',verify_token,wishlist)


module.exports = router