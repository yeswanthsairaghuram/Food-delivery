import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'


// app Config
const app = express()
const port=4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDb();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://yaswanthsairaghuram:ePiHhGhkX0OaIgzH@cluster0.oknn4.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0
