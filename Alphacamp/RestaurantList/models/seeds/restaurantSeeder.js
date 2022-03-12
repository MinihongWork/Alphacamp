const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const RestaurantList = require('./restaurant.json').results
var MongoClient = require('mongodb').MongoClient

 // create mongodb
const url = "mongodb://localhost/Restaurant-List"
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
console.log("Database created!");
  db.close();
});

//connect mongodb
mongoose.connect('mongodb://localhost/Restaurant-List', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(RestaurantList)
    .then(() => {
        console.log('restaurantSeeder add success')
        db.close()
    })
  console.log('done')
})
