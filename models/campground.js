const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        ref: 'review'
    }]
})

module.exports = mongoose.model('Campground', campgroundSchema);