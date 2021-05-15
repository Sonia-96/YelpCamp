const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
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
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '609c951cb3bdfa23486b0802',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price: Math.floor(Math.random() * 30) + 10,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo eius voluptatem quod omnis earum minima quibusdam, asperiores accusantium? Itaque quo sed quibusdam possimus ullam facere, dignissimos aliquid magni officia.'
        });
        await camp.save();
    }
}

seedDB().then(() => mongoose.connection.close());