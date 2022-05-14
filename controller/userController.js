require('dotenv').config();

const User = require('../model/userModel');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')
const colors = require('colors')

exports.DaftarUser = async (req, res) => {

    const { username, email, name, password } = req.body

    let emailUser = await User.findOne({ email: email })
    let usernameUser = await User.findOne({ username: username })
    if (emailUser) {
        return res.status(404).json({
            status: false,
            message: 'email sudah di pakai'
        })
    }
    if (usernameUser) {
        return res.status(404).json({
            status: false,
            message: 'username sudah di pakai'
        })
    }

    const hashPassword = await bcryptjs.hash(password, 10)
    const user = new User({
        name: name,
        username: username,
        email: email,
        password: hashPassword,
    })
    user.save()
    return res.status(201).json({
        status: true,
        message: "User Berhasil Di Daftarkan",
    })
}


exports.LoginUser = async (req, res) => {
    const { email, password, username } = req.body

    const dataUser = await User.findOne({ $or: [{ email: email }, { username: email }] });

    // console.log(dataUserName)
    if (dataUser) {
        // proses berhasil
        console.log(colors.bgBlue(dataUser.username))

        const passwordUser = await bcryptjs.compare(password, dataUser.password);
        if (passwordUser) {

            const data = {
                id: dataUser._id,
                nama: dataUser.name
            }

            const token = await jsonwebtoken.sign(data, process.env.JSWT_SECRET)

            return res.status(200).json({
                status: true,
                message: "login telah berhasil",
                token,
                nama: dataUser.name,
                userName: dataUser.username
                // nama: nama,
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "LOGIN GAGAL"
            })
        }

    } else {
        return res.status(404).json({
            status: false,
            message: "LOGIN GAGAL"
        })
    }

}


exports.getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.id })
    return res.status(200).json({
        message: 'berhasil',
        data: user
    })
}