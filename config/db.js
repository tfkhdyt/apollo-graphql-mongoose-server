require('dotenv').config()

const password = process.env.MONGODB_ATLAS_PWD
const uri = `mongodb+srv://tfkhdyt:${password}@cluster0.pbe5r.mongodb.net/belajar-graphql?retryWrites=true&w=majority`

module.exports = {
  password,
  uri,
}
