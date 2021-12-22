const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Mahasiswa',
  {
    nim: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    prodi: {
      type: String,
      required: true,
    },
  },
  'mahasiswa'
)
