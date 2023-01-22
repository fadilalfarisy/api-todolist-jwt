import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './src/routes/index.js'

dotenv.config()

const { PORT, MONGO_URI } = process.env

try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    console.log('connect to db')
} catch (error) {
    console.log(error.message)
};

const app = express()

//middleware
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(cookieParser()); //allow to access cookie
app.use(bodyParser.urlencoded({ extended: false })) //allow request with format x-www-form-urlencoded
app.use(bodyParser.json()) //allow request with format json
app.use('/api', router)

//error handlers
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        status: 500,
        message: 'failed',
        info: 'server error'
    });
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

