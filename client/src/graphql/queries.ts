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

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems {
      id
      name
      description
      price
      category
      isAvailable
      imageURL
      trending
    }
  }
`;

export const GET_USER_MENU = gql`
  query GetUserMenu {
    getUserMenu {
      _id
      name
      description
      price
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

export const GET_ALL_MENUS = gql`
  query GetAllMenus {
    menus {
      _id
      items {
        _id
        name
        description
        price
        category
        imageURL
        isAvailable
        trending
      }
      restaurantId {
        _id
        name
        location
      }
      lastUpdated
    }
  }
`;

export const GET_TRENDING_MENU_ITEMS = gql`
  query GetTrendingMenuItems {
    menuItems {
    _id
    name
    imageURL
    price
    description
    trending
    restaurantId {
      _id
      name
      location
    }
  }
}
`;