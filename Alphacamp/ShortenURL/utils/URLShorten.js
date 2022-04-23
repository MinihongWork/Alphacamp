const BASE_62_CHAR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const ShortURL = function ShortURL (shortenURL_Length) {
  let result = ''

  for (let i = 0; i < shortenURL_Length; i++) {
    const randomIndex = Math.floor(Math.random() * 62)

    const chooseChar = BASE_62_CHAR[randomIndex]

    result += chooseChar
  }
  return result
}

module.exports = ShortURL
