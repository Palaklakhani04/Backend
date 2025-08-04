import mongoose from "mongoose"

export default function connectMongoDb(url){
    return mongoose.connect(url)
}