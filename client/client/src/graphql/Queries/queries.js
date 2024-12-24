import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_ALL_MENUS = gql`
  query GetAllMenus {
    menus {
      id
      name
      createdAt
    }
  }
`;

export const GET_MENU_BY_ID = gql`
  query GetMenuById($id: ID!) {
    menu(id: $id) {
      id
      name
      items {
        id
        name
        price
      }
    }
  }
`;
