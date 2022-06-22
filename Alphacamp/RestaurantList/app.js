// import env

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require packages used in the project
const express = require('express')
const app = express()
const port = process.env.PORT
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const flash = require('connect-flash')
require('./config/mongoose')

// static path
app.use(express.static('public'))

// handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// express-session
const session = require('express-session')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// body-parser

app.use(bodyParser.urlencoded({ extended: true }))

// methodoverride
app.use(methodOverride('_method'))

// connect-flash
// passport
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})

// routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
