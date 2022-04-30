const express = require('express')
const router = express.Router()
const randomshortURL = require('../../utils/URLShorten')
const URL = require('../../models/URL')

router.get('/', (req, res) => {
  URL.find()
  .lean()
  .then(data => res.render('index', { URLdata: data }))
  .catch(error => console.error(error))
})

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  URL.findOne({ ShortURL: shortURL })
    .then(data => data ? res.redirect(data.OriginalURL) : res.render('error'))
    .catch(error => console.error(error))
})

router.post('/result', (req, res) => {
  const shortURL = randomshortURL(5)
  
  // check URL is a standard URL
  const inputvalue = (req.body.url).replace(/\s*/g, '').match('^https://')
  if (!inputvalue) return res.render('error')

  // check mongodb
  URL.findOne({ OriginalURL: inputvalue.input })
    .then(data => data || URL.create({ OriginalURL: inputvalue.input, ShortURL: shortURL }))
    .then(data => res.render('result', { ShortURL: data.ShortURL}))
    .catch(error => console.error(error))
})

router.delete('/:shortURL', (req, res) => {
    const TargetURL = req.params.shortURL 
    return URL.findOneAndDelete(TargetURL)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
