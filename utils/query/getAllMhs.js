const Mahasiswa = require('../../models/mahasiswa')

module.exports = async () => Mahasiswa.find().sort('nim')

