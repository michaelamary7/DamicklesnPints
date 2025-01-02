import { gql } from "@apollo/client";

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

export const GET_USER_MENU = gql`
  query GetUserMenu {
    getUserMenu {
      id
      name
      description
      price
      category
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query GetRestaurants($searchTerm: String) {
    restaurants(search: $searchTerm) {
      id
      name
      cuisine
      rating
      menuItems {
        id
        name
        price
        description
      }
    }
  }
`;
