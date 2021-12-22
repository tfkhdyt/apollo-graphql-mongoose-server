const mongoose = require('mongoose')
const { uri } = require('../config/db')

mongoose.connect(uri, (err) => {
  if (err) return err
  console.log('MongoDB is connected...')
})
