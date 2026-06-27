import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      message
      review {
        id
        content
        createdAt
        rating
        updatedAt
        product {
          name
          description
          price
          images
          category
        }
        user {
          name
          email
          createdAt
        }
      }
    }
  }
`;

export const GET_REVIEW = gql`
  query GetReviews($productId: ID!) {
    getProductReviews(productId: $productId) {
      id
      content
      createdAt
      rating
      updatedAt
      product {
        id
        name
        description
        price
        images
        category
      }
      user {
        name
        email
        createdAt
        role
      }
    }
  }
`;

export const GET_SELLER_REVIEWS = gql`
  query GetSellerReviews {
    getSellerReviews {
      id
      content
      createdAt
      rating
      updatedAt
      product {
        id
        name
        description
        category
      }
      user {
        name
      }
    }
  }
`;
