import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title : {
            type : String,
            unique : true,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        thumbnail : {
            type:String,
            required : true
        }
    }
)

export const Products = mongoose.model('products', productSchema)