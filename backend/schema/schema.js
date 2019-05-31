const {buildSchema} = require('graphql');

module.exports = buildSchema(`

  type User {
    _id: ID!
    email: String!
    password: String!
    createdRoutes: [Route!]!
  }

  type Seat {
    seatNumber: String!
    booked: Boolean!
  }

  type Route {
    _id: ID!
    from: String!
    to: String!
    dateFrom: String!
    seats: [Seat!]!
    depTime: String!
    coachType: String!
    busName: String!
    fare: Float!
    orders: [Order!]!
  }

  type Order {
    _id: ID!
    fullName: String!
    mobileNumber: String!
    email: String!
    totalPrice: Float!
    reservedSeats: [Seat]!
    routeId: Route!
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    email: String!
    password: String
  }

  input SeatInput {
    seatNumber: String!
    booked: Boolean!
  }

  input RouteInput {
    from: String!
    to: String!
    dateFrom: String!
    seats: [SeatInput!]!
    depTime: String!
    coachType: String!
    busName: String!
    fare: Float!
  }

  input OrderInput {
    fullName: String!
    mobileNumber: String!
    email: String!
    totalPrice: Float!
    reservedSeats: [SeatInput]!
    routeId: ID!
  }

  type RootQuery {
    loginUser(userInput: UserInput): AuthData!
    searchRoutes(from: String!, to: String!, dateFrom: String!): [Route!]!
    searchRoute(_id: ID!): Route!
    searchAdminRoute(dateFrom: String!, depTime: String!, from: String!, to: String!): [Route!]!
  }

  type RootMutation {
    createUser(userInput: UserInput): User!
    createRoute(routeInput: RouteInput): Route
    createOrder(orderInput: OrderInput): Order!
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`);
