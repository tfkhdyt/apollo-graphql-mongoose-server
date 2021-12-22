const { gql } = require('apollo-server')

module.exports = gql`
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
`
