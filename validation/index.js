const { check, validationResult } = require('express-validator')


exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validationDaftar = [
    check('name', 'nama lengkap tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().isEmail().withMessage('masukan email yang valid').trim(),
    check('username', 'username tidak boleh kosong').notEmpty().custom(value => !/\s/.test(value)).withMessage('username tidak bisa menggunakan spasi'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 8 }).withMessage('password minimal 8 karakter')
]

exports.validationLogin = [
    check('email', 'email atau username tidak boleh kosong').notEmpty().custom(value => !/\s/.test(value)).withMessage('email atau username tidak bisa menggunakan spasi'),
]