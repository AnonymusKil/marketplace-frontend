import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput!) {
    createOrder(input: $input) {
      message
      order {
        id
        items {
          product {
            id
            name
            images
            price
          }
          quantity
        }
        total
        subtotal
        orderStatus
        createdAt
        shippingAddress {
          fullName
          phoneNumber
          emailAddress
          address
          city
          state
          country
          street
          zipCode
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      items {
        product {
          id
          name
          images
          price
        }
        quantity
      }
      total
      subtotal
      orderStatus
      createdAt
      shippingAddress {
        fullName
        phoneNumber
        emailAddress
        address
        city
        state
        country
        street
        zipCode
      }
    }
  }
`;

export const GET_SELLER_ORDERS = gql`
  query GetSelllerOrders {
    getSellerOrders {
      id
      total
      orderStatus
      createdAt
      couponCode
      paymentStatus
      user {
        name
        email
      }
      payment {
        method
      }
        items {
        product {
          name
          images
          price
        }
        quantity
      }
      shippingAddress {
        fullName
        phoneNumber
        emailAddress
        address
        city
        state
        country
        street
        zipCode
      }
    }
  }
`;

export const UPDATE_SELLER_ORDERS = gql`
  mutation UpdateSellerOrders($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      total
      orderStatus
      createdAt
      couponCode
      payment {
        method
      }
    }
  }
`;
