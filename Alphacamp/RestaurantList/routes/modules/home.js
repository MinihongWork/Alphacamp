const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurants: restaurant }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => {
      const keyword = req.query.keyword
      const restaurants = restaurant.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: restaurants, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
