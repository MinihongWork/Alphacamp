const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const RestaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')
var MongoClient = require('mongodb').MongoClient


 // create mongodb
const url = "mongodb://localhost/Restaurant-List"
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
console.log("Database created!");
  db.close();
});

//connect mongodb
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(RestaurantList)
    .then(() => {
        console.log('restaurantSeeder add success')
        db.close()
    })
  console.log('done')
})
