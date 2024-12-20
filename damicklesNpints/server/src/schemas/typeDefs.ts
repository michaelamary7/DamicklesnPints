export const typeDefs = `#graphql
  type MenuItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    ingredients: [String!]!
    isAvailable: Boolean!
    image: String
    nutritionalInfo: NutritionalInfo
    createdAt: String!
  }

  type NutritionalInfo {
    calories: Int
    protein: Float
    carbohydrates: Float
    fats: Float
  }

  type Category {
    id: ID!
    name: String!
    description: String
    displayOrder: Int
  }

  input MenuItemInput {
    name: String!
    description: String!
    price: Float!
    category: String!
    ingredients: [String!]!
    isAvailable: Boolean
    image: String
    nutritionalInfo: NutritionalInfoInput
  }

  input NutritionalInfoInput {
    calories: Int
    protein: Float
    carbohydrates: Float
    fats: Float
  }

  type Query {
    menuItems: [MenuItem]!
    menuItem(id: ID!): MenuItem
    menuItemsByCategory(category: String!): [MenuItem]!
    categories: [Category]!
  }

  type Mutation {
    addMenuItem(input: MenuItemInput!): MenuItem!
    updateMenuItem(id: ID!, input: MenuItemInput!): MenuItem!
    deleteMenuItem(id: ID!): Boolean!
    toggleMenuItemAvailability(id: ID!): MenuItem!
  }
`;