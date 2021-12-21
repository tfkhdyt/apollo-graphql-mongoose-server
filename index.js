const { ApolloServer, gql } = require("apollo-server");

const mahasiswa = [
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

  type Query {
    mahasiswa: [Mahasiswa]
    mhs(nim: ID): Mahasiswa
  }
`;
const resolvers = {
  Query: {
    mahasiswa: () => mahasiswa,
    mhs: (_, { nim }) => mahasiswa.find((e) => e.nim === nim),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
