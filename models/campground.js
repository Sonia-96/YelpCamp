const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    price: Number,
    description: String,
    location: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// delete reviews of a campground
campgroundSchema.post('findOneAndRemove', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema);