const Mahasiswa = require('../../models/mahasiswa')

module.exports = async (_, args) => {
  const Mhs = await Mahasiswa.findOne({ nim: args.nim })
  await Mahasiswa.findByIdAndUpdate(Mhs._id, args)
  return args
}
