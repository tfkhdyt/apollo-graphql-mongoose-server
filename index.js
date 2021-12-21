const { ApolloServer, gql } = require("apollo-server");

let mahasiswa = [
  {
    nim: "301200032",
    nama: "Taufik Hidayat",
    prodi: "Teknik Informatika",
  },
  {
    nim: "301200033",
    nama: "Teja Kusumah",
    prodi: "Teknik Informatika",
  },
];

const typeDefs = gql`
  type Mahasiswa {
    nim: ID!
    nama: String!
    prodi: String!
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
    deleteMhs(nim: ID): DeleteMhs
  }
`;

const resolvers = {
  Query: {
    mahasiswa: () => mahasiswa,
    mhs: (_, { nim }) => mahasiswa.find((e) => e.nim === nim),
  },
  Mutation: {
    addMhs: (_, args) => {
      const newUser = args;
      mahasiswa.push(newUser);
      return newUser;
    },
    deleteMhs: (_, { nim }) => {
      mahasiswa = mahasiswa.filter((e) => e.nim !== nim);
      return {
        msg: 'Data berhasil dihapus!',
        nim
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
