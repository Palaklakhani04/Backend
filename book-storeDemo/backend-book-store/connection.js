import mongoose from "mongoose"

export default function connectMongoDb(url){
    return mongoose.connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB error" , err));
}