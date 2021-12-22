const Mahasiswa = require('../../models/mahasiswa')

module.exports = async (_, { nim }) => await Mahasiswa.findOne({ nim })
