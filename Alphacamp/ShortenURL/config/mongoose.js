const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/URLs'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  console.log('Database created!')
  db.close()
})


const db = mongoose.connection
db.on('error',() =>{
    console.log('connection error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db