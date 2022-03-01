// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurant = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
  res.render('index',{restaurants : restaurant.results})
})

app.get('/restaurants/:restaurant_id',(req,res) => {
    const RestaurantContent = restaurant.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)    
    res.render('content',{restaurants : RestaurantContent})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurant.results.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })