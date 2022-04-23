const mongoose = require('mongoose')
const Schema = mongoose.Schema

const URL = new Schema({
  OriginalURL: { type: 'string', required: true },
  ShortURL: { type: 'string', required: true }
})

module.exports = mongoose.model('URL', URL)
