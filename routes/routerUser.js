const express = require('express');
const router = require('express').Router();
const { DaftarUser, LoginUser, getSingleUser } = require('../controller/userController')
const { runValidation, validationDaftar, validationLogin } = require('../validation')
const middleware = require('../middleware/middleware')



router.post('/register', validationDaftar, runValidation, DaftarUser);
router.post('/login', validationLogin, runValidation, LoginUser);
router.get('/user', middleware, getSingleUser);
router.post('/ambulance/',)



module.exports = router