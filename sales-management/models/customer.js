import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            requied : true
        } 
    }
)

export const Customer = mongoose.model('customer', customerSchema)