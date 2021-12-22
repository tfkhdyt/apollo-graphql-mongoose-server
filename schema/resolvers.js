const Mahasiswa = require('../models/mahasiswa')

module.exports = {
  Query: {
    mahasiswa: async () => await Mahasiswa.find().sort('nim'),
    mhs: async (_, { nim }) => await Mahasiswa.findOne({ nim }),
  },

  Mutation: {
    addMhs: async (_, args) => {
      await Mahasiswa.insertMany(args)
      return args
    },

    updateMhs: async (_, args) => {
      const Mhs = await Mahasiswa.findOne({ nim: args.nim });
      await Mahasiswa.findByIdAndUpdate(Mhs._id, args)
      return args
    },
    deleteMhs: async (_, args) => {
      const Mhs = await Mahasiswa.findOne({ nim: args.nim });
      await Mahasiswa.findByIdAndDelete(Mhs._id)
      return Mhs
    }
  },
};
