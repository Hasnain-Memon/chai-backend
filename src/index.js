import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './env'
})

const port = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running at port : ${port}`)
    })
    app.on('error', (error) => {
        console.log("ERROR :", error)
        throw error
    })
})
.catch((err) => {
    console.log("Mongo db connection failed", err);
})




/*

Approach one (not professional but it can be used) : CAUTION

import express from "express"
const app = express()
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("ERROR :", error)
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`you app is listening on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR :", error);
        throw error
    }
})()
*/