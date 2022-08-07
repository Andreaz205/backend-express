require ('dotenv').config()
const express = require ( 'express')
const mongoose= require ( 'mongoose')
const router =require ( "./router.js")
const fileUpload =require ( 'express-fileupload')
const cors= require ( "cors")
const cookieParser =require ( "cookie-parser")
const errorMiddleware =require ( "./middlewares/error-middleware.js");


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
// app.use(express.static('static'))
// app.use(fileUpload())
app.use('/api', router)
app.use(errorMiddleware)

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT '  + PORT))
    } catch  (e) {
        console.log(e)
    }
}

startApp ()




