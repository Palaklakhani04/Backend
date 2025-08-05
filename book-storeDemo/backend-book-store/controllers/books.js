import { BookDetails } from "../models/bookDetail.js";

export async function getAllBooks(req, res){
    const allBooks = await BookDetails.find({})
    if (allBooks.length == 0){
        return res.json([])
    }else {
        return res.json(allBooks)
    }
}

export async function getBookByCondition(req, res ){
    const condition = req.params['condition']
    const {bookName, id, bookAuthor, gt, lt, ne, noOfPage, bookDesc , bookCategory} = req.query

    switch (condition) {
        case 'bookName':
                if(bookName){
                    const bookNameData = await BookDetails.findOne({bookName : bookName})
                    bookNameData ? res.json(bookNameData) : res.json([]) 
                }else{
                    const sortByBookName = await BookDetails.find({}).sort({ 'bookName' : 1 })
                    sortByBookName ? res.json(sortByBookName) : res.json([]) 
                }  
            break;
        case 'id':
            const idData = await BookDetails.findOne({id : id})
            idData ? res.json(idData) : res.json([])
            break;
        case 'bookDesc&bookAuthor':
            const descAndAuthorData = await BookDetails.find({ $and: [{bookDesc : bookDesc},{bookAuthor : bookAuthor}] })
            descAndAuthorData ? res.json(descAndAuthorData) : res.json([])
            break;
        case 'bookName&bookAuthor':
            const nameAndAuthorData = await BookDetails.find({ $and: [{bookName : bookName},{bookAuthor : bookAuthor}] })
            nameAndAuthorData ? res.json(nameAndAuthorData) : res.json([])
            break;
        case 'bookName&bookCategory':
            const nameAndCategoryData = await BookDetails.find({ $and: [{bookName : bookName},{bookCategory : bookCategory}] })
            nameAndCategoryData ? res.json(nameAndCategoryData) : res.json([])
            break;
        case 'noOfPage':
            if(gt === '100'){
                const data = await BookDetails.find({noOfPage : {$gt : gt}})
                data ? res.json(data) : res.json([])
            }else if(gt === '25' && lt === '90' && !ne ){
                const data = await BookDetails.find({noOfPage : {$gt :gt, $lt:lt}})
                data ? res.json(data) : res.json([])
            }else if(gt === '25' && lt === '90' && ne === '80'){
                const data = await BookDetails.find({noOfPage : {$gt :gt, $lt: lt, $ne: ne}})
                data ? res.json(data) : res.json([])
            }else if(noOfPage === '0'){
                const data = await BookDetails.find({noOfPage : noOfPage})
                data ? res.json(data) : res.json([])
            }else {
                const sortByNoOfPage = await BookDetails.find({}).sort({ noOfPage : 1 })
                sortByNoOfPage ? res.json(sortByNoOfPage) : res.json([])
            }
            break;
        case 'releasedYear':
            const data = (gt || lt) ?  
                await BookDetails.find({ $or: [{releasedYear : gt} ,{releasedYear : lt}] }) 
                : 
                await BookDetails.find({}).sort({ releasedYear : 1 })
            data ? res.json(data) : res.json([])
            break;
        case 'bookPrice':
            const sortByBookPrice = await BookDetails.find({}).sort({ bookPrice: 1 })
            sortByBookPrice ? res.json(sortByBookPrice) : res.json([])
            break;
        case 'bookAuthor':
            const sortByBookAuthor = await BookDetails.find({}).sort({ bookAuthor: 1 })
            sortByBookAuthor ? res.json(sortByBookAuthor) : res.json([])
            break;
        case 'bookCategory':
            const sortByBookCategory = await BookDetails.find({}).sort({ bookCategory: 1 })
            sortByBookCategory ? res.json(sortByBookCategory) : res.json([])
            break;
    }
} 

export async function updateBookByCondition(req, res) {
    const condition = req.params['condition']
    const query = req.query

    switch (condition) {
        case 'bookName':
            try {
                const updateName = await BookDetails.findOneAndUpdate({ 'bookName': query.bookName} ,{ $set: {'bookName': req.body.bookName }})
                return updateName ? res.json({message : 'successfull'}) : res.json({msg: "Invalide data"})
            } catch (error) {
                return res.status(500).send("error")
            }
            break;
        case 'bookName&bookAuthor':
            try {
                if(query.bookName && query.bookAuthor){
                    const updatedData = await BookDetails.findOneAndUpdate({'bookName': query.bookName} ,{ $set: {'bookName': req.body.bookName,'bookAuthor': req.body.bookAuthor}})
                    return updatedData ? res.json({message : 'successfull'}) : res.json({message : 'Data not Found'})
                }
            } catch (error) {
                return res.status(500).send("error")
            }
            break;
    }
    
}

export async function deleteBookByCondition(req, res) {
    const condition = req.params['condition']
    const query = req.query
    console.log(query)
    switch (condition) {
        case 'id':
            const DeleteData = await BookDetails.findOneAndDelete({ "id" : query.id })
            DeleteData ? res.json({message : 'successfull'}) : res.json({message : 'Data not Found'})
            break;
        // case 'bookName':
        //     await BookDetails.deleteOne({ "bookName" : query.bookName })
        //         .then(() => res.json({ msg: "successfully" }))
        //         .catch((err) => console.log(err))
        //     break;
        // case 'bookDesc&bookAuthor':
        //     await BookDetails.deleteOne({$and: [{'bookDesc': query.bookDesc},{'bookAuthor': query.bookAuthor}]})
        //         .then(() => res.json({ msg: "successfully" }))
        //         .catch((err) => console.log(err))
        //     break;
        // case 'bookName&bookCategory':
        //     await BookDetails.deleteOne({$and: [{'bookName': query.bookName},{'bookCategory': query.bookCategory}]})
        //         .then(() => res.json({ msg: "successfully" }))
        //         .catch((err) => console.log(err))
        //     break;
    }
}