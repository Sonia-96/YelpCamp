const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const Images = require('./images');
const Users = require('./users');
const {descriptors, places} = require('./seedHelpers');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelpCamp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async function() {
    await Campground.deleteMany({});
    let prevImg1 = -1;
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 1000);
        let img1 = Math.floor(Math.random() * Images.length);
        while (img1 === prevImg1) {
            img1 = Math.floor(Math.random() * Images.length);
        }
        prevImg1 = img1;
        let img2 = Math.floor(Math.random() * Images.length);
        while (img2 === img1) {
            img2 = Math.floor(Math.random() * Images.length);
        }
        const user = Math.floor(Math.random() * Users.length);
        const campground = new Campground({
            author: Users[user],
            location: `${cities[random].city}, ${cities[random].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [Images[img1], Images[img2]],
            price: Math.floor(Math.random() * 30) + 10,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo eius voluptatem quod omnis earum minima quibusdam, asperiores accusantium? Itaque quo sed quibusdam possimus ullam facere, dignissimos aliquid magni officia.'
        });
        await campground.save();
    }
}

seedDB().then(() => mongoose.connection.close());