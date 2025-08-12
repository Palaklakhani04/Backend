import mongoose from "mongoose";

export default function conneteMongoDb(url){
    return mongoose.connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch(() => console.log("MongoDB connection error"))
}