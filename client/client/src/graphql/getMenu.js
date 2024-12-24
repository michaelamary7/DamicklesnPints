import { gql } from '@apollo/client';

const GET_MENU = gql`
  query GetMenu {
    menu {
      id
      name
      price
      category
    }
  }
`;

export default GET_MENU;