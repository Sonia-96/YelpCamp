const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const campgroundsRoute = require('./routes/campgrounds');
const reviewsRoute = require('./routes/reviews');

const app = express();
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(morgan('common'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

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

app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:id/reviews", reviewsRoute)

app.get("/", (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500, message="Something went wrong!"} = err;
    res.status(statusCode).render('error', {err});
})

app.listen(8080, (req, res) => {
    console.log("Serving on port 8080!");
})