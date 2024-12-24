import { gql } from '@apollo/client';

export const CREATE_MENU = gql`
  mutation CreateMenu($name: String!) {
    createMenu(input: { name: $name }) {
      id
      name
      createdAt
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation UpdateMenu($id: ID!, $name: String!) {
    updateMenu(id: $id, input: { name: $name }) {
      id
      name
      updatedAt
    }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($id: ID!) {
    deleteMenu(id: $id) {
      id
    }
  }
`;

export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($menuId: ID!, $name: String!, $price: Float!) {
    addMenuItem(menuId: $menuId, input: { name: $name, price: $price }) {
      id
      name
      price
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($id: ID!, $name: String, $price: Float) {
    updateMenuItem(id: $id, input: { name: $name, price: $price }) {
      id
      name
      price
    }
  }
`;

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id) {
      id
    }
  }
`;
