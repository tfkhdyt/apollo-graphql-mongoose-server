const addMhs = require('../utils/mutation/addMhs')
const deleteMhs = require('../utils/mutation/deleteMhs')
const updateMhs = require('../utils/mutation/updateMhs')
const getAllMhs = require('../utils/query/getAllMhs')
const getMhsByNim = require('../utils/query/getMhsByNim')

module.exports = {
  Query: {
    mahasiswa: getAllMhs,
    mhs: getMhsByNim,
  },

  Mutation: {
    addMhs: addMhs,
    updateMhs: updateMhs,
    deleteMhs: deleteMhs,
  },
}
