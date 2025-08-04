import { BookDetails } from "../models/bookDetail.js";

export async function getAllBooks(req, res){
    const allBooks = await BookDetails.find({})
    return res.json({allBooks})
}

export async function getBookByCondition(req, res ){
    const condition = req.params['condition']
    const query = req.query

    switch (condition ) {
        case 'bookName':
            if(query.bookName){
                const bookName = await BookDetails.findOne({bookName : query.bookName})
                res.json({bookName})  
            }else{
                const sortByBookName = await BookDetails.find({}).sort({ 'bookName' : 1 })
                res.json({sortByBookName})
            }
            break;
        case 'id':
            const idData = await BookDetails.findOne({id : query.id})
            res.json({idData})
            break;
        case 'bookName&bookAuthor':
            const nameAndAuthorData = await BookDetails.find({ $and: [{bookName : query.bookName},{bookAuthor : query.bookAuthor}] })
            res.json({nameAndAuthorData})
            break;
        case 'noOfPage':
            if(query.gt === '100'){
                const data = await BookDetails.find({noOfPage : {$gt :query.gt}})
                res.json({data})
            }else if(query.gt === '25' && query.lt === '90' && !query.ne ){
                const data = await BookDetails.find({noOfPage : {$gt :query.gt, $lt: query.lt}})
                res.json({data})
            }else if(query.gt === '25' && query.lt === '90' && query.ne === '80'){
                const data = await BookDetails.find({noOfPage : {$gt :query.gt, $lt: query.lt, $ne: query.ne}})
                res.json({data})
            }else if(query.noOfPage === '0'){
                const data = await BookDetails.find({noOfPage : query.noOfPage})
                res.json({data})
            }else {
                const sortByNoOfPage = await BookDetails.find({}).sort({ noOfPage : 1 })
                res.json({sortByNoOfPage})
            }
            break;
        case 'releasedYear':
            if(query.gt || query.lt){
                const releasedYearData = await BookDetails.find({ $or: [{releasedYear : query.gt} ,{releasedYear : query.lt}] })
                res.json({releasedYearData})
            }else{
                const sortBookByReleasedYear = await BookDetails.find({}).sort({ releasedYear : 1 })
                res.json({sortBookByReleasedYear})
            }
            break;
        case 'bookPrice':
            const sortByBookPrice = await BookDetails.find({}).sort({ bookPrice: 1 })
            res.json({sortByBookPrice})
            break;
        case 'bookAuthor':
            const sortByBookAuthor = await BookDetails.find({}).sort({ bookAuthor: 1 })
            res.json({sortByBookAuthor})
            break;
        case 'bookCategory':
            const sortByBookCategory = await BookDetails.find({}).sort({ bookCategory: 1 })
            res.json({sortByBookCategory})
            break;
    }
} 

export async function updateBookByCondition(req, res) {
    const condition = req.params['condition']
    const query = req.query

    switch (condition) {
        case 'bookName':
            await BookDetails.updateOne({ 'bookName': query.bookName} ,{ $set: {'bookName': req.body.bookName }})
                .then(() => res.json({ msg: "successfully" }))
                .catch((err) => console.log(err))
            break;
        case 'bookName&bookAuthor':
            if(query.bookName && query.bookAuthor){
                await BookDetails.updateOne({'bookName': query.bookName} ,{ $set: {'bookName': req.body.bookName,'bookAuthor': req.body.bookAuthor}})
                    .then(() => res.json({ msg: "successfully" }))
                    .catch((err) => console.log(err))
            }
            break;
    }
}

export async function deleteBookByCondition(req, res) {
    const condition = req.params['condition']
    const query = req.query

    switch (condition) {
        case 'id':
            await BookDetails.deleteOne({ "id" : query.id })
                .then(() => res.json({ msg: "successfully" }))
                .catch((err) => console.log(err))
            break;
        case 'bookName':
            await BookDetails.deleteOne({ "bookName" : query.bookName })
                .then(() => res.json({ msg: "successfully" }))
                .catch((err) => console.log(err))
            break;
        case 'bookDesc&bookAuthor':
            await BookDetails.deleteOne({$and: [{'bookDesc': query.bookDesc},{'bookAuthor': query.bookAuthor}]})
                .then(() => res.json({ msg: "successfully" }))
                .catch((err) => console.log(err))
            break;
        case 'bookName&bookCategory':
            await BookDetails.deleteOne({$and: [{'bookName': query.bookName},{'bookCategory': query.bookCategory}]})
                .then(() => res.json({ msg: "successfully" }))
                .catch((err) => console.log(err))
            break;
    }
}