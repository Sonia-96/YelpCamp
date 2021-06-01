## About

[YelpCamp](https://stark-stream-80494.herokuapp.com/campgrounds) is a Yelp style website for campgrounds, which supports users in registering, logging in, creating new campgrounds, posting reviews, editing and deleting their previous posts.  

View this project: https://stark-stream-80494.herokuapp.com/

## Features

![homepage](images\homepage.jpg)

<center><strong>Responsive design, using Bootstrap5 framework</strong></center>

![campground index page](images\index-page.jpg)

<center><strong>Index page with a cluster map</strong></center>

![campground details](images\campground-details.jpg)

<center><strong>Campground details: images, reviews and the location in a map</strong></center>

![create and edit campgrounds](images\create-and-edit.jpg)

<center><strong>Making new campground and editing previous posts (authentication required)</strong></center>

## Implementation

This website is written in JavaScript, CSS and EJS. The tools used in this project are Node.js, Express, Bootstrap, MongoDB. Passport.js is used to handle authentication.

The data of campgrounds, reviews and users are stored in Mongo Atlas, and images that users upload are stored in Cloudinary. The source of map is Mapbox.com.

### Languages: 

- JavaScript
- EJS
- CSS

### Tools:

- [Node.js](https://nodejs.org/en/)：Node.js是能够在服务器端运行JavaScript的开源的、跨平台的运行环境
- [Express](https://expressjs.com/)：Express是一种适用于Node.js的Web框架（特点：轻量、快速、unopinionated）
  - express middleware：https://expressjs.com/en/resources/middleware.html
- [Bootstrap v5.0](https://getbootstrap.com/)：最热门的CSS框架，用于制作responsive and mobile-first webpage
- [MongoDB](): MongoDB是一种最常用的NoSQL (not only SQL) 数据库，常和Node、Express结合使用。
- NPM Tools:
  - [Mongoose](https://mongoosejs.com/): Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
  - [Passport.js](http://www.passportjs.org/): authentication middleware for Node.js
  - [Joi](https://www.npmjs.com/package/joi): schema description & data validation
  - [dotenv](https://www.npmjs.com/package/dotenv)：从`.env`文件中载入环境变量至`process.env`
  - [helmet](https://www.npmjs.com/package/helmet)：通过设置HTTP headers（应该是可以使用的数据源？）来保护网站安全
  - [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize): Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection. （防止网站遭受XSS攻击）

### Services

- [Cloudinary](https://cloudinary.com/)：储存用户上传的图片
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)：储存campgrounds、reviews、users的数据
- [Mapbox](https://www.mapbox.com/): map and location data





## Installation

git clone

注册cloudinary，mongo atlas，heroku账户



## Credits

This is the capstone project of Colt Steele's course - Web Developer Bootcamp 2021. Thanks for his creating such a wonderful course!