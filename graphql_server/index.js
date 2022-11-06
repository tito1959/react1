import { gql, ApolloServer, UserInputError, AuthenticationError, PubSub } from "apollo-server"
import './connection/db.js'
import jwt from "jsonwebtoken"
import { Person } from "./models/Person.js"
import { User } from "./models/User.js"

const JWT_SECRET = 'T0K3N'

const typeDefinitions = gql`
type Address {
    street: String!
    city: String!
}

type Person {
    canDrink: Boolean!
    name: String!
    phone: String
    address: Address!
    check: String!
    id: ID!
}

type User {
  username: String!
  friends: [Person]
  id: ID!
}

type Token {
  value: String!
}

type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
    me: User
}

type Mutation {
    addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
    ): Person 

    editNumber(
        name: String!
        phone: String!
    ): Person

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addAsFriend(
      name: String!
    ): User
}

enum YesNo {
    YES
    NO
}

type Subscription {
  personAdded: Person!
}
`

const resolvers = {

  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) return await Person.find({})
      const data = await Person.find({ phone: { $exists: args.phone === 'YES' } })
      return data
    },
    findPerson: async (root, args) => {
      const { name } = args
      const data = await Person.findOne({ name })
      return data
    },
    me: async (root, args, context) => {
      const request = await context.currentUser
      return request
    }
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      const person = new Person({ ...args })
      // const {name, phone, street, city} = args
      try {
        await person.save()
        currentUser.friends = { person }
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) return null

      person.phone = args.phone

      try {
        const data = await person.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return data
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, friends: null })

      const req = await user.save().catch(err => {
        throw new UserInputError(err.message, { invalidArgs: args })
      })
      return req
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') { throw new UserInputError('Wrong Credentials') }

      const userToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userToken, JWT_SECRET) }
    },
    addAsFriend: async (root, args, context) => {
      const { currentUser } = context

      if (!currentUser) throw new AuthenticationError('you are not logged in')
      const person = await Person.findOne({ name: args.name })

      if (!currentUser.friends) {
        currentUser.friends = [person]

      } else {
        const comingInFriend = (person) => !currentUser.friends
          .map(p => p._id)
          .includes(person._id)

        if (comingInFriend(person)) {
          currentUser.friends = currentUser.friends.concat(person)
        } else {
          throw new UserInputError('User already is your friend')
        }
      }

      await currentUser.save()
      return currentUser
    }
  },

  Person: {
    canDrink: (root) => root.age > 18,
    address: (root) => ({ street: root.street, city: root.city }),
    check: () => 'assert'
  }
}

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, JWT_SECRET)
      const currentUser = await User.findById(id).populate('friends')

      // console.log(currentUser)
      return { currentUser }
    }

  }
})

/* Iniciando servidor */
server.listen().then(({ url }) => {
  console.log(`Server ready in port: ${url}`)
})