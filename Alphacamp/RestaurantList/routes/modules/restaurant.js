const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

router.get('/:restaurant_id',(req,res) => {
    restaurant.find()
    .lean()
    .then( restaurant =>{
        const RestaurantContent = restaurant.find(restaurant => restaurant._id.toString() === req.params.restaurant_id)    
        res.render('content',{restaurants : RestaurantContent})
        })
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
    res.render('newcontent')
})

router.get('/:restaurant_id/edit',(req,res) => {
    restaurant.find()
    .lean()
    .then( restaurant =>{
        const RestaurantContent = restaurant.find(restaurant => restaurant._id.toString() === req.params.restaurant_id)    
        res.render('edit',{restaurants : RestaurantContent})
        })
    .catch(error => console.log(error))
})

router.post('/create', (req, res) => {
    return restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return restaurant.findByIdAndUpdate(id,req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router