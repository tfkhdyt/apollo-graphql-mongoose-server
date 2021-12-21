const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose')

const uri = 'mongodb+srv://tfkhdyt:oxsNzDKhjNPDQ@cluster0.pbe5r.mongodb.net/belajar-graphql?retryWrites=true&w=majority'

mongoose.connect(uri, (err) => {
  if (err) return err
  console.log('MongoDB is connected...')
})

const Mahasiswa = mongoose.model('Mahasiswa', {
  nim: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  prodi: {
    type: String,
    required: true
  },
}, 'mahasiswa')

const typeDefs = gql`
  type Mahasiswa {
    nim: ID!
    nama: String!
    prodi: String!
  }

  type UpdateMhs {
    nim: ID!
    nama: String
    prodi: String
  }

  type DeleteMhs {
    msg: String!
    nim: ID!
  }

  type Query {
    mahasiswa: [Mahasiswa]
    mhs(nim: ID): Mahasiswa
  }

  type Mutation {
    addMhs(nama: String!, nim: ID!, prodi: String!): Mahasiswa!
    updateMhs(nim: ID!, nama: String, prodi: String): String
    deleteMhs(nim: ID): DeleteMhs
  }
`;

const resolvers = {
  Query: {
    mahasiswa: async () => await Mahasiswa.find(),
    mhs: async (_, { nim }) =>
      await Mahasiswa.findOne({ nim })
  },
  Mutation: {
    addMhs: async (_, args) => {
      const newMhs = args
      await Mahasiswa.insertMany(args)
      return newMhs
    },
    updateMhs: async (_, args) => {
      const Mhs = await Mahasiswa.findOne({ nim: args.nim })
      await Mahasiswa.findByIdAndUpdate(Mhs._id, args)
      return `[${Mhs.nim}] ${Mhs.nama} berhasil diupdate!`
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
