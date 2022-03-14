// require packages used in the project

const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./models/restaurant.js')
app.use(express.static('public'))

// require express-handlebars here
const exphbs = require('express-handlebars')

//handlebars

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true }))

//mongodb connect
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Restaurant-List', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/',(req,res) => {
  restaurant.find()
  .lean()
  .then(restaurant => res.render('index',{restaurants : restaurant}))
  .catch(error => console.log(error))
  
})

app.get('/restaurants/:restaurant_id',(req,res) => {
  restaurant.find()
  .lean()
  .then( restaurant =>{
    const RestaurantContent = restaurant.find(restaurant => restaurant._id.toString() === req.params.restaurant_id)    
    res.render('content',{restaurants : RestaurantContent})
    })
  .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  restaurant.find()
  .lean()
  .then( restaurant =>{
    const keyword = req.query.keyword
    const restaurants = restaurant.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })
  .catch(error => console.log(error))
})

app.get('/restaurant/new', (req, res) => {
  res.render('newcontent')
})

app.get('/restaurants/:restaurant_id/edit',(req,res) => {
  restaurant.find()
  .lean()
  .then( restaurant =>{
    const RestaurantContent = restaurant.find(restaurant => restaurant._id.toString() === req.params.restaurant_id)    
    res.render('edit',{restaurants : RestaurantContent})
    })
  .catch(error => console.log(error))
})

app.post('/restaurant/create', (req, res) => {
  return restaurant.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.post('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurant.findByIdAndUpdate(id,req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})


app.post('/restaurant/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  restaurant.findByIdAndDelete(id)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })