import { Customer } from "../models/customer.js";
import  Orders  from "../models/orders.js";
import { Products } from "../models/products.js";

export async function getTotalSalesPerCust(req, res){
    try{
        const data = await Orders.aggregate([
            {
                $group : {
                    _id: "$customerId",
                    totalSum : { $sum : "$price" }
                }
            },
            {
                $lookup : {
                    from: "customer",
                    localField: "_id",
                    foreignField: "_id",
                    as: 'customerData'
                }
            },
            {
                $unwind : '$customerData'
            },
            {
                $project : {
                    name:"$customerData.name",
                    "totalSum": 1
                }
            }
        ])
        res.json(data)
    } catch(error) {
        console.log(error)
    }
    
}

export async function getTopProductsByRevenue(req, res) {
    const data = await Orders.aggregate([
        {
             $unwind : "$products"
        },
        {
            $group : {
                _id:"$products.productId",
                totalQuantity: { $sum : "$products.quantity"}
            }
        },
        {
            $lookup : {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "salesRevenue"
            }
        },
        {
            $unwind : "$salesRevenue"
        },
        {
            $project : {
                title : "$salesRevenue.title",
                "totalQuantity":1,
                revenue : { $multiply: ["$salesRevenue.price", "$totalQuantity" ] }
            }
        },
        {
            $sort : {"revenue" : -1}
        },
        {
            $limit : 3
        }
    ])
    if(!data){
        return res.status(500).send("error in data")
    }
    else{
        return res.json(data)
    }
}

export async function getReportOfPastSales(req, res){
    const data = await Orders.aggregate([
        {

        }
    ])
}

export async function getTotalExceedAvgQunetity(req, res){
    const data = await Orders.aggregate([
        {
            $project : {
                "products":1,
                "customerId":1,
                totalQuantity : { $sum : "$products.quantity"}
            }
        },
        {
            $setWindowFields :{
                output: {
                    averageQuantity: {
                        $avg: "$totalQuantity",
                        window: {}
                    }
                }
            }
        },
        {
            $match : {
                $expr: { $gt: ["$totalQuantity" , "$averageQuantity"]}
            }
        },
        {
            $unwind : "$products"
        },
        {
            $project: {
                "products":1,
                "customerId":1,
                "totalQuantity":1,
                "averageQuantity":1
            }
        }
      
    ])
    if(!data){
        return res.status(500).send("error in data")
    }
    else{
        return res.json(data)
    }
}

