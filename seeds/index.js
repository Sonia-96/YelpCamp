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
            author: '609f853d24f24709d8f6c006',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/db0eykdf8/image/upload/v1621326143/YelpCamp/xfz3mnqp5fv7iba0qhwq.jpg',
                    filename: 'YelpCamp/xfz3mnqp5fv7iba0qhwq'
                },
                {
                    url: 'https://res.cloudinary.com/db0eykdf8/image/upload/v1621326144/YelpCamp/tlybfuxihosqfdgk4qt8.jpg',
                    filename: 'YelpCamp/tlybfuxihosqfdgk4qt8'
                }
            ],
            price: Math.floor(Math.random() * 30) + 10,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo eius voluptatem quod omnis earum minima quibusdam, asperiores accusantium? Itaque quo sed quibusdam possimus ullam facere, dignissimos aliquid magni officia.'
        });
        await camp.save();
    }
}

seedDB().then(() => mongoose.connection.close());