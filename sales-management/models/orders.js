import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customerId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Customer'
        },
        products : [
            {
                productId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Products'
                },
                quantity : {
                    type : Number,
                    required : true
                }
            }
        ],
        thumbnail : {
            type:String,
            required : true
        },
        price : {
            type : Number,
            required : true
        }
    }
)

const Orders = mongoose.model('orders', OrderSchema)

export default Orders