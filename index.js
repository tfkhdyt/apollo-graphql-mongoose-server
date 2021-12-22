const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://tfkhdyt:oxsNzDKhjNPDQ@cluster0.pbe5r.mongodb.net/belajar-graphql?retryWrites=true&w=majority";

mongoose.connect(uri, (err) => {
  if (err) return err;
  console.log("MongoDB is connected...");
});

const Mahasiswa = mongoose.model(
  "Mahasiswa",
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
  "mahasiswa"
);

const typeDefs = gql`
  type Mahasiswa {
    nim: ID!
    nama: String
    prodi: String
  }

  type Query {
    mahasiswa: [Mahasiswa]
    mhs(nim: ID): Mahasiswa
  }

  type Mutation {
    addMhs(nama: String!, nim: ID!, prodi: String!): Mahasiswa
    updateMhs(nim: ID!, nama: String, prodi: String): Mahasiswa
    deleteMhs(nim: ID): Mahasiswa
  }
`;

const resolvers = {
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

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
