import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
  mutation addReservation($name: String!, $phone: String!, $email: String!, $date: String!, $time: String!, $guests: Int!) {
    addReservation(name: $name, phone: $phone, email: $email, date: $date, time: $time, guests: $guests) {
      _id
      name
      phone
      email
      date
      time
      guests
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation($reservationId: ID!, $name: String!, $phone: String!, $email: String!, $date: String!, $time: String!, $guests: Int!) {
    updateReservation(reservationId: $reservationId, name: $name, phone: $phone, email: $email, date: $date, time: $time, guests: $guests) {
      _id
      name
      phone
      email
      date
      time
      guests
    }
  }
`;

export const REMOVE_RESERVATION = gql`
  mutation removeReservation($reservationId: ID!) {
    removeReservation(reservationId: $reservationId) {
      _id
      name
      phone
      email
      date
      time
      guests
    }
  }
`;

export const SAVED_RESERVATION = gql`
  mutation confirmReservation($reservationId: ID!) {
    confirmReservation(reservationId: $reservationId) {
      _id
      name
      phone
      email
      date
      time
      guests
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($reservationId: ID!) {
    deleteReservation(reservationId: $reservationId) {
      _id
      name
      phone
      email
      date
      time
      guests
    }
  }
`;

export const MAKE_RESERVATION = gql`
  mutation MakeReservation($restaurantId: ID!, $date: String!, $time: String!, $partySize: Int!) {
    createReservation(
      restaurantId: $restaurantId
      date: $date
      time: $time
      guests: $guestSize
    ) {
      id
      confirmed
    }
  }
`;