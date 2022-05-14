require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const RouteUser = require('./routes/routerUser')

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'),
        next()
})

app.use('/v1/user', RouteUser)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const CONNETION_URL = process.env.MONGO_URL

mongoose
    .connect(CONNETION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log(
                `server telah berjalan di port : ${process.env.PORT}`,
                'http://localhost:5000',
            ),
        ),
    )
    .catch((error) => console.log(error.message))
