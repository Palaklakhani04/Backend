import { Customer } from "../models/customer.js";
import  Orders  from "../models/orders.js";
import { Products } from "../models/products.js";
import path from "path"

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
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)
    
    const data = await Orders.aggregate([
        {
            $match : {
                createdAt : { $gte : twelveMonthsAgo}
            }
        },
        {
            $group : {
                _id : {
                    year: { $year : "$createdAt"},
                    month: { $month : "$createdAt"}
                }, 
                totalSalePerMonth : { $sum : "$price"}
            }
        },
        {
            $project : {
                "_id":0,
                month:"$_id.month",
                year:"$_id.year",
                "monthcreatedAt":1,
                "totalSalePerMonth" : 1
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

export async function getTotalExceedAvgQunetity(req, res){
    const data = await Orders.aggregate([
        {
            $unwind : "$products"
        },
        {
            $group : {
                _id : "$products.productId",
                totalquantity: { $sum :"$products.quantity"}
            }
        },
        {
            $lookup:{
                from : "products",
                localField: "_id",
                foreignField: "_id",
                as:"productData"
            }
        },
        {
            $unwind : "$productData"
        },
        {
            $project : {
                "_id":1,
                "totalquantity":1,
                title : "$productData.title",
            }
        },
        {
            $setWindowFields:{
                output: {
                    averageQuantity:{
                        $avg : "$totalquantity",
                        window: {}
                    }
                }
            }
        },
        {
            $match:{
                $expr : { $gt : ["$totalquantity" , "$averageQuantity"]}
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

export async function addProduct(req, res) {
    try {
        const { title , price, description } = req.body
        const thumbnail = `${req.file.filename}`

        const newProduct = new Products({
            title,
            description,
            price,
            thumbnail,
        })

        const product = await newProduct.save()
        console.log(product)
        res.status(201).json(product)
    }catch (error){
        console.error(error);
        return res.status(500).send("Server error")
    }
}