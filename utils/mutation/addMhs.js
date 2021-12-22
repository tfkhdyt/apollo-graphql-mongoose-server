const Mahasiswa = require('../../models/mahasiswa')

module.exports = async (_, args) => {
  await Mahasiswa.insertMany(args);
  return args;
};
