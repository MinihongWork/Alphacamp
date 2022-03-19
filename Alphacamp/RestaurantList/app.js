// require packages used in the project

const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./models/restaurant.js')
app.use(express.static('public'))

//handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true }))

//methodoverride
const methodOverride = require('method-override') 
app.use(methodOverride('_method'))

//routes
const routes = require('./routes')
app.use(routes)

//mongodb connect
require('./config/mongoose')

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })