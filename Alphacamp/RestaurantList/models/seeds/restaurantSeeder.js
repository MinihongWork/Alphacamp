const Restaurant = require('../restaurant')
const RestaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')
const MongoClient = require('mongodb').MongoClient

// create mongodb
const url = 'mongodb://localhost/Restaurant-List'
MongoClient.connect(url, function (err, db) {
  if (err) throw err
  console.log('Database created!')
  db.close()
})

// connect mongodb
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(RestaurantList)
    .then(() => {
      console.log('restaurantSeeder add success')
      db.close()
    })
  console.log('done')
})
