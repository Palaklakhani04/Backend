import mongoose from "mongoose"

const bookDetailSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        bookName: {
            type: String,
            required: true
        },
        bookDesc: {
            type: String,
            required: true
        },
        bookAuthor: {
            type: String,
            required: true
        },
        noOfPage: {
            type: Number,
            required: true
        },
        bookCategory: {
            type: String,
            required: true
        },
        bookPrice: {
            type: Number,
            required: true
        },
        releasedYear: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

export const BookDetails = mongoose.model('bookDetail', bookDetailSchema)                                                                           