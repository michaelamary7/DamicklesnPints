export const typeDefs = `#graphql
  type Query {
    allMenuItems: [MenuItem!]!
    menu(_id:ID): Menu!
    menuItems: [MenuItem]!
    menuItem(_id: ID!): MenuItem!
    reservations: [Reservation]!
    getReservationsByStatus(status: ReservationStatus!): [Reservation]!
    getReservation(_id: ID!): Reservation!
    getCurrentUser: User!
    getUserMenu: [Menu]!
  }

  type MenuItem {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    imageURL: String!
    isAvailable: Boolean!
    restaurantId: Restaurant!
    trending: Boolean!
    lastUpdated: String!
  }

  input MenuItemInput {
    name: String!
    description: String!
    price: Float!
    category: String!
    isAvailable: Boolean
  }

  type Restaurant {
    _id: ID!
    name: String!
    location: String!
  }

  type Menu {
    _id: ID!
    items: [MenuItem]!
    restaurantId: Restaurant!
    lastUpdated: String!
  }

  type Reservation {
    _id: ID!
    name: String!
    email: String
    phone: String!
    date: String!
    time: String!
    guests: Int!
    notes: String
    reservationId: String
    status: ReservationStatus!
    createdAt: String!
  }

  enum ReservationStatus {
    pending
    confirmed
    rejected
  }

  input ReservationInput {
    name: String!
    email: String
    phone: String!
    date: String!
    time: String!
    guests: Int!
    specialRequests: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    addMenuItem(input: MenuItemInput): MenuItem!
    updateMenuItem(id: ID!, input: MenuItemInput): MenuItem!
    deleteMenuItem(id: ID!): MenuItem!
    toggleMenuItemAvailability(id: ID!): MenuItem!
    addReservation(input: ReservationInput): Reservation!
    updateReservationStatus(reservationId: ID!, status: ReservationStatus!): Reservation!
    login(email: String!, password: String!): Auth
    createUser(input: CreateUserInput!): Auth
    deleteReservation(reservationId: ID!): Reservation!
  }

`;