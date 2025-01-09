import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      reservations {
        _id
        name
        phone
        email
        date
        time
        guests
      }
      menuItems {
        _id
        name
        description
        price
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_USER = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    token
    user {
        _id
        username
        email
      }
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $username: String!, $email: String!, $password: String!) {
    updateUser(userId: $userId, username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($input: MenuItemInput!) {
    addMenuItem(input: $input) {
      id
      name
      description
      price
      category
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation updateMenuItem($menuId: ID!, $name: String!, $description: String!, $price: Float!) {
    updateMenuItem(menuId: $menuId, name: $name, description: $description, price: $price) {
      _id
      name
      description
      price
    }
  }
`;


export const DELETE_MENU_ITEM = gql`
  mutation deleteMenuItem($menuId: ID!) {
    deleteMenuItem(menuId: $menuId) {
      _id
      name
      description
      price
    }
  }
`;


export const ADD_RESERVATION = gql`
  mutation addReservation($input: ReservationInput!) {
    addReservation(input: $input) {
      createdAt
      name
      email
      phone
      date
      time
      guests
      notes
      resaurantId
      time
    }
  }
`;
