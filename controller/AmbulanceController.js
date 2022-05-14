require('dotenv').config();


const Ambulance = require('../model/AmbulanceModels')
const colors = require('colors');

exports.AmbulancePost = async (req, res) => {
    const { name, ketersediaan } = req.body
    let namaAmbulance = await Ambulance.find();
    let ketersediaanAmbulance = await Ambulance.find();


    const ambulance = new Ambulance({
        name: name,
        ketersediaan: ketersediaan
    });

    ambulance.save();
    return res.status(201).json({
        status: true,
        message: 'data Ambulance Berhasil Di tambahkan'
    })

}