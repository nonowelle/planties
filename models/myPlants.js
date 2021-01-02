const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const plantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

    family: String,
    images: [
        {
            url: String,
            filename: String,
        }
    ],
    water: String,

    sun: String,

    notes: String,

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],


    journals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Journal'
        }
    ]
})

//MONGOOSE QUERY MIDDLEWARE TO DELETE COMMENTS AFTER DELETING A PLANT

plantSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

const Plant = mongoose.model('Plant', plantSchema);




module.exports = Plant; 