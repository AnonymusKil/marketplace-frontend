import { gql } from "@apollo/client";

export const ADD_OR_UPDATE_CART_ITEM = gql`
  mutation AddOrUpdateCartItem($input: AddToCartInput!) {
    addOrUpdateCartItem(input: $input) {
      message
      cart {
        items {
          product {
            id
            name
            images
            price
            category
          }
          quantity
          priceAtAdd
        }
        totalPrice
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    getCart {
      items {
        product {
          id
          name
          images
          price
          category
        }
        quantity
        priceAtAdd
      }
      totalPrice
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($input: DeleteCartInput!) {
    deleteCartItem(input: $input) {
      message
      cart {
        items {
          product {
            id
            name
            images
            price
          }
          quantity
          priceAtAdd
        }
        totalPrice
      }
    }
  }
`;
